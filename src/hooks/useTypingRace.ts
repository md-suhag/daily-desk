'use client';

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { DifficultyLevel, GameStatus } from '@/types/game';
import { RaceAction, RaceState } from '@/types/race';
import { calculateAccuracy, calculateWPM } from '@/core/engine/calculations';
import { getRandomPassage } from '@/core/difficulty/contentCorpuses';

function createInitialState(difficulty: DifficultyLevel = 'EASY'): RaceState {
  const passage = getRandomPassage(difficulty);
  return {
    status: 'IDLE',
    difficulty,
    targetText: passage.text,
    typedInput: '',
    cursorIndex: 0,
    countdownSeconds: 3,
    errorIndices: [],
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

function raceReducer(state: RaceState, action: RaceAction): RaceState {
  switch (action.type) {
    case 'SET_DIFFICULTY': {
      const passage = getRandomPassage(action.payload);
      return {
        ...createInitialState(action.payload),
        targetText: passage.text,
      };
    }

    case 'START_COUNTDOWN':
      return {
        ...state,
        status: 'COUNTDOWN',
        countdownSeconds: 3,
      };

    case 'TICK_COUNTDOWN':
      if (state.countdownSeconds <= 1) {
        return {
          ...state,
          status: 'PLAYING',
          countdownSeconds: 0,
          rawMetrics: {
            ...state.rawMetrics,
            startTime: performance.now(),
          },
        };
      }
      return {
        ...state,
        countdownSeconds: state.countdownSeconds - 1,
      };

    case 'START_GAME':
      return {
        ...state,
        status: 'PLAYING',
        rawMetrics: {
          ...state.rawMetrics,
          startTime: performance.now(),
        },
      };

    case 'TYPE_CHAR': {
      if (state.status !== 'PLAYING') return state;

      const { char, timestamp } = action.payload;
      const expectedChar = state.targetText[state.cursorIndex];
      const newTypedInput = state.typedInput + char;
      const nextCursor = state.cursorIndex + 1;

      const isCorrect = char === expectedChar;
      const newTotalChars = state.rawMetrics.totalCharsTyped + 1;
      const newCorrectChars = state.rawMetrics.correctCharsTyped + (isCorrect ? 1 : 0);
      const newIncorrectChars = state.rawMetrics.incorrectCharsTyped + (isCorrect ? 0 : 1);

      const newErrorIndices = isCorrect
        ? state.errorIndices
        : [...state.errorIndices, state.cursorIndex];

      const durationSec = state.rawMetrics.startTime
        ? (timestamp - state.rawMetrics.startTime) / 1000
        : 0;

      let uncorrectedErrors = 0;
      for (let i = 0; i < newTypedInput.length; i++) {
        if (newTypedInput[i] !== state.targetText[i]) {
          uncorrectedErrors++;
        }
      }

      const { grossWPM, netWPM } = calculateWPM(newTotalChars, uncorrectedErrors, durationSec);
      const accuracy = calculateAccuracy(newCorrectChars, newTotalChars);

      const isCompleted = nextCursor >= state.targetText.length;

      return {
        ...state,
        status: isCompleted ? 'COMPLETED' : 'PLAYING',
        typedInput: newTypedInput,
        cursorIndex: nextCursor,
        errorIndices: newErrorIndices,
        rawMetrics: {
          ...state.rawMetrics,
          totalCharsTyped: newTotalChars,
          correctCharsTyped: newCorrectChars,
          incorrectCharsTyped: newIncorrectChars,
          uncorrectedErrors,
          endTime: isCompleted ? timestamp : state.rawMetrics.endTime,
        },
        calculatedMetrics: {
          grossWPM,
          netWPM,
          accuracy,
          durationSeconds: Math.round(durationSec),
        },
      };
    }

    case 'BACKSPACE': {
      if (state.status !== 'PLAYING' || state.cursorIndex === 0) return state;

      const newTypedInput = state.typedInput.slice(0, -1);
      const nextCursor = state.cursorIndex - 1;

      let uncorrectedErrors = 0;
      for (let i = 0; i < newTypedInput.length; i++) {
        if (newTypedInput[i] !== state.targetText[i]) {
          uncorrectedErrors++;
        }
      }

      const durationSec = state.rawMetrics.startTime
        ? (performance.now() - state.rawMetrics.startTime) / 1000
        : 0;

      const { grossWPM, netWPM } = calculateWPM(
        state.rawMetrics.totalCharsTyped,
        uncorrectedErrors,
        durationSec
      );

      return {
        ...state,
        typedInput: newTypedInput,
        cursorIndex: nextCursor,
        rawMetrics: {
          ...state.rawMetrics,
          uncorrectedErrors,
        },
        calculatedMetrics: {
          ...state.calculatedMetrics,
          grossWPM,
          netWPM,
          durationSeconds: Math.round(durationSec),
        },
      };
    }

    case 'PAUSE':
      if (state.status !== 'PLAYING') return state;
      return { ...state, status: 'PAUSED' };

    case 'RESUME':
      if (state.status !== 'PAUSED') return state;
      return { ...state, status: 'PLAYING' };

    case 'RESTART': {
      const passage = getRandomPassage(state.difficulty);
      return {
        ...createInitialState(state.difficulty),
        targetText: passage.text,
      };
    }

    case 'TICK_TIME': {
      if (state.status !== 'PLAYING' || !state.rawMetrics.startTime) return state;
      const durationSec = (action.payload - state.rawMetrics.startTime) / 1000;
      const { grossWPM, netWPM } = calculateWPM(
        state.rawMetrics.totalCharsTyped,
        state.rawMetrics.uncorrectedErrors,
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

    case 'LOAD_TEXT':
      return {
        ...state,
        targetText: action.payload,
        typedInput: '',
        cursorIndex: 0,
      };

    default:
      return state;
  }
}

export function useTypingRace(initialDifficulty: DifficultyLevel = 'EASY') {
  const [state, dispatch] = useReducer(raceReducer, initialDifficulty, createInitialState);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const metricsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown handler
  useEffect(() => {
    if (state.status === 'COUNTDOWN') {
      countdownTimerRef.current = setInterval(() => {
        dispatch({ type: 'TICK_COUNTDOWN' });
      }, 1000);
    } else if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [state.status]);

  // Metrics tick timer
  useEffect(() => {
    if (state.status === 'PLAYING') {
      metricsTimerRef.current = setInterval(() => {
        dispatch({ type: 'TICK_TIME', payload: performance.now() });
      }, 500);
    } else if (metricsTimerRef.current) {
      clearInterval(metricsTimerRef.current);
      metricsTimerRef.current = null;
    }

    return () => {
      if (metricsTimerRef.current) clearInterval(metricsTimerRef.current);
    };
  }, [state.status]);

  // Global Keyboard listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      // Auto start countdown on keypress if IDLE
      if (state.status === 'IDLE') {
        if (e.key === 'Enter' || e.key === ' ' || e.key.length === 1) {
          e.preventDefault();
          dispatch({ type: 'START_COUNTDOWN' });
          return;
        }
      }

      if (state.status === 'COMPLETED' && e.key === 'Enter') {
        e.preventDefault();
        dispatch({ type: 'RESTART' });
        return;
      }

      if (state.status !== 'PLAYING') return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        dispatch({ type: 'BACKSPACE' });
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        dispatch({ type: 'PAUSE' });
        return;
      }

      // Single printable character
      if (e.key.length === 1) {
        e.preventDefault();
        dispatch({
          type: 'TYPE_CHAR',
          payload: { char: e.key, timestamp: performance.now() },
        });
      }
    },
    [state.status]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const setDifficulty = (diff: DifficultyLevel) => dispatch({ type: 'SET_DIFFICULTY', payload: diff });
  const startRace = () => dispatch({ type: 'START_COUNTDOWN' });
  const pauseRace = () => dispatch({ type: 'PAUSE' });
  const resumeRace = () => dispatch({ type: 'RESUME' });
  const restartRace = () => dispatch({ type: 'RESTART' });

  const typeChar = useCallback(
    (char: string) => {
      if (state.status === 'IDLE') {
        dispatch({ type: 'START_COUNTDOWN' });
        return;
      }
      if (state.status === 'PLAYING') {
        dispatch({
          type: 'TYPE_CHAR',
          payload: { char, timestamp: performance.now() },
        });
      }
    },
    [state.status]
  );

  const backspace = useCallback(() => {
    if (state.status === 'PLAYING') {
      dispatch({ type: 'BACKSPACE' });
    }
  }, [state.status]);

  const progressPercentage = Math.min(
    100,
    Math.round((state.cursorIndex / (state.targetText.length || 1)) * 100)
  );

  return {
    state,
    progressPercentage,
    setDifficulty,
    startRace,
    pauseRace,
    resumeRace,
    restartRace,
    typeChar,
    backspace,
  };
}

