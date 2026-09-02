import React from 'react';
import { Flag, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RaceTrackProps {
  progressPercentage: number;
  wpm: number;
  className?: string;
}

export function RaceTrack({ progressPercentage, wpm, className }: RaceTrackProps) {
  const clampedProgress = Math.min(100, Math.max(0, progressPercentage));

  return (
    <div className={cn('flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-5 shadow-sm', className)}>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent" />
          <span>Race Track</span>
        </div>
        <span className="font-mono text-primary font-bold">{clampedProgress}% Complete</span>
      </div>

      <div className="relative mt-2 h-14 w-full rounded-xl bg-secondary/80 p-2 overflow-hidden border border-border/60">
        {/* Track Grid Lines */}
        <div className="absolute inset-0 flex justify-between px-4 opacity-20 pointer-events-none">
          <div className="w-px bg-foreground h-full" />
          <div className="w-px bg-foreground h-full" />
          <div className="w-px bg-foreground h-full" />
          <div className="w-px bg-foreground h-full" />
        </div>

        {/* Finish Line Flag Pattern */}
        <div className="absolute right-2 top-2 bottom-2 w-6 flex flex-col justify-center items-center rounded bg-accent/20 border border-accent/40">
          <Flag className="h-4 w-4 text-accent" />
        </div>

        {/* Moving Racer Avatar */}
        <div
          className="absolute top-2 bottom-2 transition-all duration-300 ease-out flex items-center gap-1.5"
          style={{ left: `calc(${clampedProgress}% * 0.88 + 8px)` }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg glow-primary font-bold font-mono text-sm">
            🏎️
          </div>
          {wpm > 0 && (
            <span className="hidden sm:inline-block rounded-md bg-background/90 px-2 py-0.5 text-xs font-bold font-mono text-accent border border-accent/30 shadow">
              {wpm} WPM
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
