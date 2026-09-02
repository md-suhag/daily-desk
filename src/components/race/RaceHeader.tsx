'use client';

import React from 'react';
import { DifficultyLevel, GameStatus } from '@/types/game';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RotateCcw, Play, Pause } from 'lucide-react';

export interface RaceHeaderProps {
  status: GameStatus;
  difficulty: DifficultyLevel;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export function RaceHeader({
  status,
  difficulty,
  onSelectDifficulty,
  onStart,
  onPause,
  onResume,
  onRestart,
}: RaceHeaderProps) {
  const difficulties: { level: DifficultyLevel; label: string; desc: string }[] = [
    { level: 'EASY', label: 'Easy', desc: 'Common words, short sentences' },
    { level: 'MEDIUM', label: 'Medium', desc: 'Standard vocabulary & capitalization' },
    { level: 'HARD', label: 'Hard', desc: 'Complex syntax, numbers & symbols' },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
      {/* Mode & Difficulty Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Typing Race</h1>
          <Badge variant={status === 'PLAYING' ? 'success' : status === 'PAUSED' ? 'warning' : 'primary'}>
            {status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Type the prompt accurately. Content complexity increases with difficulty.
        </p>

        <div className="flex items-center gap-1.5 mt-1">
          {difficulties.map((d) => (
            <button
              key={d.level}
              onClick={() => onSelectDifficulty(d.level)}
              disabled={status === 'PLAYING' || status === 'COUNTDOWN'}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-150 ${
                difficulty === d.level
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={d.desc}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {status === 'IDLE' && (
          <Button onClick={onStart} variant="primary" size="md" glow>
            <Play className="h-4 w-4" /> Start Race (Enter)
          </Button>
        )}

        {status === 'PLAYING' && (
          <Button onClick={onPause} variant="outline" size="md">
            <Pause className="h-4 w-4" /> Pause (Esc)
          </Button>
        )}

        {status === 'PAUSED' && (
          <Button onClick={onResume} variant="primary" size="md">
            <Play className="h-4 w-4" /> Resume
          </Button>
        )}

        {(status === 'PLAYING' || status === 'PAUSED' || status === 'COMPLETED') && (
          <Button onClick={onRestart} variant="secondary" size="md">
            <RotateCcw className="h-4 w-4" /> Restart
          </Button>
        )}
      </div>
    </div>
  );
}
