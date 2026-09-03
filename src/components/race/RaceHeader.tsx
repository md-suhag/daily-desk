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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-sm">
      {/* Mode & Difficulty Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#111827]">Typing Race</h1>
          <Badge variant={status === 'PLAYING' ? 'success' : status === 'PAUSED' ? 'warning' : 'primary'}>
            {status}
          </Badge>
        </div>
        <p className="text-xs text-[#64748B]">
          Type the prompt accurately. Content complexity increases with difficulty.
        </p>

        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          {difficulties.map((d) => (
            <button
              key={d.level}
              onClick={() => onSelectDifficulty(d.level)}
              disabled={status === 'PLAYING' || status === 'COUNTDOWN'}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-150 ${
                difficulty === d.level
                  ? 'bg-[#F39C12] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={d.desc}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
        {status === 'IDLE' && (
          <Button onClick={onStart} variant="primary" size="md" glow className="w-full sm:w-auto">
            <Play className="h-4 w-4" /> Start Race (Enter)
          </Button>
        )}

        {status === 'PLAYING' && (
          <Button onClick={onPause} variant="outline" size="md" className="flex-1 sm:flex-none">
            <Pause className="h-4 w-4" /> Pause (Esc)
          </Button>
        )}

        {status === 'PAUSED' && (
          <Button onClick={onResume} variant="primary" size="md" className="flex-1 sm:flex-none">
            <Play className="h-4 w-4" /> Resume
          </Button>
        )}

        {(status === 'PLAYING' || status === 'PAUSED' || status === 'COMPLETED') && (
          <Button onClick={onRestart} variant="secondary" size="md" className="flex-1 sm:flex-none">
            <RotateCcw className="h-4 w-4" /> Restart
          </Button>
        )}
      </div>
    </div>
  );
}
