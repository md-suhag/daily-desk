'use client';

import React, { useEffect, useState } from 'react';
import { useFallingWords } from '@/hooks/useFallingWords';
import { useGameStats } from '@/hooks/useGameStats';
import { FallingHeader } from '@/components/falling/FallingHeader';
import { FallingStage } from '@/components/falling/FallingStage';
import { InputBufferDisplay } from '@/components/falling/InputBufferDisplay';
import { FallingResultsModal } from '@/components/falling/FallingResultsModal';
import { generatePerformanceFeedback } from '@/core/engine/calculations';
import { GameResultHistory, PerformanceFeedback } from '@/types/game';
import confetti from 'canvas-confetti';

export default function FallingWordsPage() {
  const { state, startGame, pauseGame, resumeGame, restartGame } = useFallingWords();
  const { stats, recordResult } = useGameStats();

  const [feedback, setFeedback] = useState<PerformanceFeedback | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Trigger result processing when state transitions to GAME_OVER
  useEffect(() => {
    if (state.status === 'GAME_OVER' && !hasRecorded) {
      const resultObj: GameResultHistory = {
        id: `falling-${Date.now()}`,
        gameType: 'FALLING',
        timestamp: Date.now(),
        wpm: state.calculatedMetrics.netWPM,
        accuracy: state.calculatedMetrics.accuracy,
        difficulty: state.difficulty,
        metrics: state.rawMetrics,
        score: state.score,
        wordsCleared: state.wordsCleared,
      };

      const isNewBest = recordResult(resultObj);
      const generatedFeedback = generatePerformanceFeedback(resultObj, stats);
      setFeedback(generatedFeedback);
      setHasRecorded(true);

      if (isNewBest) {
        try {
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch (e) {}
      }
    }
  }, [
    state.status,
    state.score,
    state.wordsCleared,
    state.calculatedMetrics,
    state.difficulty,
    state.rawMetrics,
    hasRecorded,
    recordResult,
    stats,
  ]);

  const handleRestart = () => {
    setHasRecorded(false);
    setFeedback(null);
    startGame();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Falling Control Header */}
      <FallingHeader
        status={state.status}
        score={state.score}
        lives={state.lives}
        maxLives={state.maxLives}
        adaptiveLevel={state.adaptiveLevel}
        wpm={state.calculatedMetrics.netWPM}
        onStart={startGame}
        onPause={pauseGame}
        onResume={resumeGame}
        onRestart={restartGame}
      />

      {/* 60fps Falling Stage Arena */}
      <FallingStage words={state.words} activeInput={state.activeInput} />

      {/* Active Keyed Buffer Indicator */}
      <InputBufferDisplay
        activeInput={state.activeInput}
        isFocused={state.status === 'PLAYING'}
      />

      {/* End Game Modal */}
      {feedback && (
        <FallingResultsModal
          isOpen={state.status === 'GAME_OVER'}
          score={state.score}
          wordsCleared={state.wordsCleared}
          wordsMissed={state.wordsMissed}
          adaptiveLevel={state.adaptiveLevel}
          calculatedMetrics={state.calculatedMetrics}
          rawMetrics={state.rawMetrics}
          feedback={feedback}
          stats={stats}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
