import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // 0 to 100
  colorVariant?: 'primary' | 'accent' | 'success' | 'warning' | 'destructive';
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({
  value,
  colorVariant = 'primary',
  className,
  showPercentage = false,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const colors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
  };

  return (
    <div className={cn('w-full flex flex-col gap-1', className)}>
      <div
        className="w-full bg-secondary/80 rounded-full h-3 overflow-hidden p-0.5 border border-border/50 relative"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out shadow-sm',
            colors[colorVariant]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs font-mono text-muted-foreground text-right">{clamped}%</span>
      )}
    </div>
  );
}
