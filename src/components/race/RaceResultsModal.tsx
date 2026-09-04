'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/common/StatCard';
import { CalculatedMetrics, LocalStatsRecord, PerformanceFeedback, RawMetrics } from '@/types/game';
import { Trophy, Zap, Target, AlertCircle, RotateCcw } from 'lucide-react';

export interface RaceResultsModalProps {
  isOpen: boolean;
  calculatedMetrics: CalculatedMetrics;
  rawMetrics: RawMetrics;
  feedback: PerformanceFeedback;
  stats: LocalStatsRecord;
  onRestart: () => void;
}

export function RaceResultsModal({
  isOpen,
  calculatedMetrics,
  rawMetrics,
  feedback,
  stats,
  onRestart,
}: RaceResultsModalProps) {
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
    <Modal isOpen={isOpen} onEnter={onRestart} title="Race Finished!" className="max-w-xl">
      <div className="flex flex-col gap-6">
        {/* Banner Message */}
        <div className="rounded-xl border border-[#F39C12]/40 bg-amber-500/10 p-4 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-[#F39C12] shrink-0" />
          <div className="flex flex-col">
            <h3 className="font-bold text-base text-foreground">{feedback.summaryMessage}</h3>
            <p className="text-xs text-muted-foreground">
              {feedback.isNewBestWPM
                ? 'Congratulations! You set a new personal record!'
                : `Your personal best is ${stats.bestRaceWPM} WPM.`}
            </p>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Net WPM"
            value={calculatedMetrics.netWPM}
            unit="WPM"
            icon={Zap}
            color="primary"
            trend={
              feedback.wpmDelta !== 0
                ? `${feedback.wpmDelta > 0 ? '+' : ''}${feedback.wpmDelta} vs best`
                : undefined
            }
          />
          <StatCard
            label="Accuracy"
            value={`${calculatedMetrics.accuracy}%`}
            icon={Target}
            color={calculatedMetrics.accuracy >= 95 ? 'success' : 'warning'}
          />
          <StatCard
            label="Errors"
            value={rawMetrics.uncorrectedErrors}
            unit="uncorrected"
            color={rawMetrics.uncorrectedErrors === 0 ? 'success' : 'destructive'}
          />
          <StatCard
            label="Duration"
            value={`${calculatedMetrics.durationSeconds}s`}
            color="default"
          />
        </div>

        {/* Character Breakdown */}
        <div className="rounded-xl border border-border bg-secondary p-4 flex justify-between items-center text-xs font-mono">
          <div>
            <span className="text-muted-foreground">Total Typed: </span>
            <span className="font-bold text-foreground">{rawMetrics.totalCharsTyped}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Correct: </span>
            <span className="font-bold text-[#F39C12]">{rawMetrics.correctCharsTyped}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Incorrect: </span>
            <span className="font-bold text-red-500">{rawMetrics.incorrectCharsTyped}</span>
          </div>
        </div>

        {/* Weak Area Insights if present */}
        {feedback.weakAreas.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border border-[#F39C12]/40 bg-amber-500/10 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F39C12]">
              <AlertCircle className="h-4 w-4" />
              <span>Performance Insights</span>
            </div>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              {feedback.weakAreas.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

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
            <RotateCcw className="h-5 w-5" /> Play Again (Enter)
          </Button>
        </div>
      </div>
    </Modal>
  );
}
