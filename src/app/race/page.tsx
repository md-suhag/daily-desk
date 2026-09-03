'use client';

import React, { useEffect, useState } from 'react';
import { useTypingRace } from '@/hooks/useTypingRace';
import { useGameStats } from '@/hooks/useGameStats';
import { RaceHeader } from '@/components/race/RaceHeader';
import { RaceTrack } from '@/components/race/RaceTrack';
import { TextPromptDisplay } from '@/components/race/TextPromptDisplay';
import { StatCard } from '@/components/common/StatCard';
import { RaceResultsModal } from '@/components/race/RaceResultsModal';
import { generatePerformanceFeedback } from '@/core/engine/calculations';
import { GameResultHistory, PerformanceFeedback } from '@/types/game';
import { Zap, Target, AlertTriangle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TypingRacePage() {
  const {
    state,
    progressPercentage,
    setDifficulty,
    startRace,
    pauseRace,
    resumeRace,
    restartRace,
  } = useTypingRace('EASY');

  const { stats, recordResult } = useGameStats();

  const [feedback, setFeedback] = useState<PerformanceFeedback | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Trigger result processing and record score when state transitions to COMPLETED
  useEffect(() => {
    if (state.status === 'COMPLETED' && !hasRecorded) {
      const resultObj: GameResultHistory = {
        id: `race-${Date.now()}`,
        gameType: 'RACE',
        timestamp: Date.now(),
        wpm: state.calculatedMetrics.netWPM,
        accuracy: state.calculatedMetrics.accuracy,
        difficulty: state.difficulty,
        metrics: state.rawMetrics,
      };

      const isNewBest = recordResult(resultObj);
      const generatedFeedback = generatePerformanceFeedback(resultObj, stats);
      setFeedback(generatedFeedback);
      setHasRecorded(true);

      // Trigger festive confetti on completion or new personal record
      try {
        confetti({
          particleCount: isNewBest ? 100 : 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback gracefully if confetti canvas not ready
      }
    }
  }, [state.status, state.calculatedMetrics, state.difficulty, state.rawMetrics, hasRecorded, recordResult, stats]);

  // Reset recording guard on race restart
  const handleRestart = () => {
    setHasRecorded(false);
    setFeedback(null);
    restartRace();
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-5xl mx-auto py-2 sm:py-6">
      {/* Race Control Header */}
      <RaceHeader
        status={state.status}
        difficulty={state.difficulty}
        onSelectDifficulty={setDifficulty}
        onStart={startRace}
        onPause={pauseRace}
        onResume={resumeRace}
        onRestart={handleRestart}
      />

      {/* Race Progress Bar */}
      <RaceTrack
        progressPercentage={progressPercentage}
        wpm={state.calculatedMetrics.netWPM}
      />

      {/* Countdown Overlay when pre-game */}
      {state.status === 'COUNTDOWN' && (
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl border border-primary/40 bg-card/90 shadow-2xl animate-pop-in backdrop-blur-md">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Get Ready</span>
          <span className="text-5xl sm:text-7xl font-black font-mono text-primary animate-pulse mt-2">
            {state.countdownSeconds}
          </span>
        </div>
      )}

      {/* Typing Text Prompt Display */}
      {state.status !== 'COUNTDOWN' && (
        <TextPromptDisplay
          targetText={state.targetText}
          typedInput={state.typedInput}
          cursorIndex={state.cursorIndex}
          status={state.status}
          onStart={startRace}
          isFocused={state.status === 'PLAYING'}
        />
      )}

      {/* Real-time HUD Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <StatCard
          label="Net Speed"
          value={state.calculatedMetrics.netWPM}
          unit="WPM"
          icon={Zap}
          color="primary"
        />
        <StatCard
          label="Accuracy"
          value={`${state.calculatedMetrics.accuracy}%`}
          icon={Target}
          color={state.calculatedMetrics.accuracy >= 95 ? 'success' : 'warning'}
        />
        <StatCard
          label="Uncorrected Errors"
          value={state.rawMetrics.uncorrectedErrors}
          icon={AlertTriangle}
          color={state.rawMetrics.uncorrectedErrors === 0 ? 'success' : 'destructive'}
        />
        <StatCard
          label="Time Elapsed"
          value={`${state.calculatedMetrics.durationSeconds}s`}
          icon={Clock}
          color="default"
        />
      </div>

      {/* Post-game Completion Modal */}
      {feedback && (
        <RaceResultsModal
          isOpen={state.status === 'COMPLETED'}
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
