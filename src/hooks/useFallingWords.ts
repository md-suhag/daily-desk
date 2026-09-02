'use client';

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { DifficultyLevel, GameStatus } from '@/types/game';
import { FallingAction, FallingWord, FallingWordsState } from '@/types/falling';
import { calculateAccuracy, calculateWPM } from '@/core/engine/calculations';
import { getRandomFallingWord } from '@/core/difficulty/contentCorpuses';
import { calculateNextAdaptiveLevel, getDifficultyConfigForLevel } from '@/core/difficulty/adaptiveDifficulty';

const INITIAL_LIVES = 5;

function createInitialFallingState(): FallingWordsState {
  return {
    status: 'IDLE',
    difficulty: 'MEDIUM',
    score: 0,
    lives: INITIAL_LIVES,
    maxLives: INITIAL_LIVES,
    wordsCleared: 0,
    wordsMissed: 0,
    activeInput: '',
    adaptiveLevel: 1,
    words: [],
    lastSpawnTime: 0,
    rawMetrics: {
      totalCharsTyped: 0,
      correctCharsTyped: 0,
      incorrectCharsTyped: 0,
      uncorrectedErrors: 0,
      startTime: null,
      endTime: null,
    },
    calculatedMetrics: {
      grossWPM: 0,
      netWPM: 0,
      accuracy: 100,
      durationSeconds: 0,
    },
  };
}

function fallingReducer(state: FallingWordsState, action: FallingAction): FallingWordsState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...createInitialFallingState(),
        status: 'PLAYING',
        lastSpawnTime: performance.now(),
        rawMetrics: {
          ...createInitialFallingState().rawMetrics,
          startTime: performance.now(),
        },
      };

    case 'PAUSE':
      if (state.status !== 'PLAYING') return state;
      return { ...state, status: 'PAUSED' };

    case 'RESUME':
      if (state.status !== 'PAUSED') return state;
      return { ...state, status: 'PLAYING' };

    case 'RESTART':
      return createInitialFallingState();

    case 'SPAWN_WORD': {
      if (state.status !== 'PLAYING') return state;
      return {
        ...state,
        words: [...state.words, action.payload],
        lastSpawnTime: performance.now(),
      };
    }

    case 'TYPE_CHAR': {
      if (state.status !== 'PLAYING') return state;
      const char = action.payload;
      const newTyped = state.activeInput + char;

      const newTotalTyped = state.rawMetrics.totalCharsTyped + 1;
      let matchedWordId: string | null = null;
      let isCorrectInput = false;

      // Check if typed sequence matches any currently falling word prefix
      const updatedWords = state.words.map((word) => {
        if (word.text.startsWith(newTyped)) {
          isCorrectInput = true;
          if (newTyped.length === word.text.length) {
            matchedWordId = word.id;
          }
          return { ...word, isTargeted: true, matchedCharsCount: newTyped.length };
        }
        return { ...word, isTargeted: false, matchedCharsCount: 0 };
      });

      const newCorrectTyped = state.rawMetrics.correctCharsTyped + (isCorrectInput ? 1 : 0);
      const newIncorrectTyped = state.rawMetrics.incorrectCharsTyped + (isCorrectInput ? 0 : 1);

      // Duration for live WPM calculation
      const durationSec = state.rawMetrics.startTime
        ? (performance.now() - state.rawMetrics.startTime) / 1000
        : 0;

      const { grossWPM, netWPM } = calculateWPM(newTotalTyped, 0, durationSec);
      const accuracy = calculateAccuracy(newCorrectTyped, newTotalTyped);

      // If a word was completely typed and cleared
      if (matchedWordId) {
        const wordObj = state.words.find((w) => w.id === matchedWordId);
        const wordLength = wordObj ? wordObj.text.length : 5;
        const addedScore = wordLength * 10 * state.adaptiveLevel;

        const remainingWords = updatedWords.filter((w) => w.id !== matchedWordId);
        const newClearedCount = state.wordsCleared + 1;

        // Check if difficulty should adapt after clearing words
        const nextLevel = calculateNextAdaptiveLevel(
          state.adaptiveLevel,
          newClearedCount,
          state.wordsMissed,
          accuracy
        );

        return {
          ...state,
          score: state.score + addedScore,
          wordsCleared: newClearedCount,
          activeInput: '', // clear buffer on word completion
          words: remainingWords.map((w) => ({ ...w, isTargeted: false, matchedCharsCount: 0 })),
          adaptiveLevel: nextLevel,
          rawMetrics: {
            ...state.rawMetrics,
            totalCharsTyped: newTotalTyped,
            correctCharsTyped: newCorrectTyped,
            incorrectCharsTyped: newIncorrectTyped,
          },
          calculatedMetrics: {
            grossWPM,
            netWPM,
            accuracy,
            durationSeconds: Math.round(durationSec),
          },
        };
      }

      // If typed input is valid prefix
      if (isCorrectInput) {
        return {
          ...state,
          activeInput: newTyped,
          words: updatedWords,
          rawMetrics: {
            ...state.rawMetrics,
            totalCharsTyped: newTotalTyped,
            correctCharsTyped: newCorrectTyped,
            incorrectCharsTyped: newIncorrectTyped,
          },
          calculatedMetrics: {
            grossWPM,
            netWPM,
            accuracy,
            durationSeconds: Math.round(durationSec),
          },
        };
      }

      // Wrong character typed -> resets active target selection and input buffer
      return {
        ...state,
        activeInput: '',
        words: state.words.map((w) => ({ ...w, isTargeted: false, matchedCharsCount: 0 })),
        rawMetrics: {
          ...state.rawMetrics,
          totalCharsTyped: newTotalTyped,
          correctCharsTyped: newCorrectTyped,
          incorrectCharsTyped: newIncorrectTyped,
        },
        calculatedMetrics: {
          grossWPM,
          netWPM,
          accuracy,
          durationSeconds: Math.round(durationSec),
        },
      };
    }

    case 'CLEAR_INPUT':
      return {
        ...state,
        activeInput: '',
        words: state.words.map((w) => ({ ...w, isTargeted: false, matchedCharsCount: 0 })),
      };

    case 'UPDATE_POSITIONS': {
      if (state.status !== 'PLAYING') return state;

      const { deltaSeconds, maxSpeedMultiplier } = action.payload;
      const missedWordIds: string[] = [];

      // Advance word positions
      const nextWords = state.words
        .map((word) => {
          const nextY = word.yPercent + word.speed * deltaSeconds * maxSpeedMultiplier;
          if (nextY >= 95) {
            missedWordIds.push(word.id);
            return null; // Word hit bottom
          }
          return { ...word, yPercent: nextY };
        })
        .filter((w): w is FallingWord => w !== null);

      if (missedWordIds.length === 0) {
        return { ...state, words: nextWords };
      }

      // Handle missed words / lost lives
      const newLives = Math.max(0, state.lives - missedWordIds.length);
      const isGameOver = newLives <= 0;

      const durationSec = state.rawMetrics.startTime
        ? (performance.now() - state.rawMetrics.startTime) / 1000
        : 0;

      const newMissedCount = state.wordsMissed + missedWordIds.length;
      const nextLevel = calculateNextAdaptiveLevel(
        state.adaptiveLevel,
        state.wordsCleared,
        newMissedCount,
        state.calculatedMetrics.accuracy
      );

      return {
        ...state,
        status: isGameOver ? 'GAME_OVER' : 'PLAYING',
        lives: newLives,
        wordsMissed: newMissedCount,
        words: nextWords,
        activeInput: '',
        adaptiveLevel: nextLevel,
        rawMetrics: {
          ...state.rawMetrics,
          endTime: isGameOver ? performance.now() : state.rawMetrics.endTime,
        },
        calculatedMetrics: {
          ...state.calculatedMetrics,
          durationSeconds: Math.round(durationSec),
        },
      };
    }

    case 'TICK_TIME': {
      if (state.status !== 'PLAYING' || !state.rawMetrics.startTime) return state;
      const durationSec = (action.payload - state.rawMetrics.startTime) / 1000;
      const { grossWPM, netWPM } = calculateWPM(
        state.rawMetrics.totalCharsTyped,
        0,
        durationSec
      );
      return {
        ...state,
        calculatedMetrics: {
          ...state.calculatedMetrics,
          grossWPM,
          netWPM,
          durationSeconds: Math.round(durationSec),
        },
      };
    }

    default:
      return state;
  }
}

export function useFallingWords() {
  const [state, dispatch] = useReducer(fallingReducer, undefined, createInitialFallingState);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Spawner loop
  useEffect(() => {
    if (state.status !== 'PLAYING') return;

    const diffConfig = getDifficultyConfigForLevel(state.adaptiveLevel);
    const now = performance.now();

    if (
      now - state.lastSpawnTime >= diffConfig.spawnIntervalMs &&
      state.words.length < diffConfig.maxActiveWords
    ) {
      const text = getRandomFallingWord(state.adaptiveLevel);
      // Random x position between 10% and 80%
      const xPercent = Math.floor(Math.random() * 70) + 10;
      const newWord: FallingWord = {
        id: `falling-${now}-${Math.random().toString(36).substring(2, 6)}`,
        text,
        xPercent,
        yPercent: 0,
        speed: diffConfig.baseSpeed,
        isTargeted: false,
        matchedCharsCount: 0,
      };

      dispatch({ type: 'SPAWN_WORD', payload: newWord });
    }
  }, [state.status, state.words.length, state.adaptiveLevel, state.lastSpawnTime]);

  // High performance animation frame loop
  useEffect(() => {
    if (state.status !== 'PLAYING') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    lastTimeRef.current = performance.now();

    const loop = (currentTime: number) => {
      const deltaSeconds = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Update falling positions
      dispatch({
        type: 'UPDATE_POSITIONS',
        payload: { deltaSeconds, maxSpeedMultiplier: 1.0 },
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state.status]);

  // Keypress listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (state.status === 'IDLE' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        dispatch({ type: 'START_GAME' });
        return;
      }

      if (state.status === 'GAME_OVER' && e.key === 'Enter') {
        e.preventDefault();
        dispatch({ type: 'START_GAME' });
        return;
      }

      if (state.status !== 'PLAYING') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        dispatch({ type: 'PAUSE' });
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        dispatch({ type: 'CLEAR_INPUT' });
        return;
      }

      // Single printable character keypress
      if (e.key.length === 1 && e.key !== ' ') {
        e.preventDefault();
        dispatch({ type: 'TYPE_CHAR', payload: e.key.toLowerCase() });
      }
    },
    [state.status]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const startGame = () => dispatch({ type: 'START_GAME' });
  const pauseGame = () => dispatch({ type: 'PAUSE' });
  const resumeGame = () => dispatch({ type: 'RESUME' });
  const restartGame = () => dispatch({ type: 'RESTART' });

  return {
    state,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
  };
}
