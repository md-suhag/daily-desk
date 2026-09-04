'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/common/StatCard';
import { CalculatedMetrics, LocalStatsRecord, PerformanceFeedback, RawMetrics } from '@/types/game';
import { Trophy, Zap, Target, Flame, RotateCcw } from 'lucide-react';

export interface FallingResultsModalProps {
  isOpen: boolean;
  score: number;
  wordsCleared: number;
  wordsMissed: number;
  adaptiveLevel: number;
  calculatedMetrics: CalculatedMetrics;
  rawMetrics: RawMetrics;
  feedback: PerformanceFeedback;
  stats: LocalStatsRecord;
  onRestart: () => void;
}

export function FallingResultsModal({
  isOpen,
  score,
  wordsCleared,
  wordsMissed,
  adaptiveLevel,
  calculatedMetrics,
  rawMetrics,
  feedback,
  stats,
  onRestart,
}: FallingResultsModalProps) {
  const isNewHighScore = score > stats.bestFallingScore && stats.bestFallingScore > 0;
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        buttonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onEnter={onRestart} title="Game Over" className="max-w-xl">
      <div className="flex flex-col gap-6">
        {/* Banner Message */}
        <div className="rounded-xl border border-[#F39C12]/40 bg-amber-500/10 p-4 flex items-center gap-3">
          <Flame className="h-8 w-8 text-[#F39C12] shrink-0" />
          <div className="flex flex-col">
            <h3 className="font-bold text-base text-foreground">
              {isNewHighScore ? '🏆 New High Score!' : 'Game Over!'}
            </h3>
            <p className="text-xs text-muted-foreground">
              You reached Adaptive Level {adaptiveLevel} and destroyed {wordsCleared} words.
            </p>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Final Score"
            value={score}
            icon={Trophy}
            color="warning"
          />
          <StatCard
            label="Peak WPM"
            value={calculatedMetrics.netWPM}
            unit="WPM"
            icon={Zap}
            color="primary"
          />
          <StatCard
            label="Accuracy"
            value={`${calculatedMetrics.accuracy}%`}
            icon={Target}
            color={calculatedMetrics.accuracy >= 90 ? 'success' : 'warning'}
          />
          <StatCard
            label="Words Cleared"
            value={wordsCleared}
            color="default"
          />
        </div>

        {/* Summary Details */}
        <div className="rounded-xl border border-border bg-secondary p-4 flex justify-between items-center text-xs font-mono">
          <div>
            <span className="text-muted-foreground">Words Missed: </span>
            <span className="font-bold text-red-500">{wordsMissed}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Session Duration: </span>
            <span className="font-bold text-foreground">{calculatedMetrics.durationSeconds}s</span>
          </div>
          <div>
            <span className="text-muted-foreground">Previous Best: </span>
            <span className="font-bold text-[#F39C12]">{stats.bestFallingScore}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            ref={buttonRef}
            onClick={onRestart}
            variant="primary"
            size="lg"
            glow
            className="w-full bg-[#F39C12] hover:bg-[#D68910] text-white font-bold"
          >
            <RotateCcw className="h-5 w-5" /> Try Again (Enter)
          </Button>
        </div>
      </div>
    </Modal>
  );
}
