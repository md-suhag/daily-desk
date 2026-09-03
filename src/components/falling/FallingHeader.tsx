'use client';

import React from 'react';
import { GameStatus } from '@/types/game';
import { Badge } from '@/components/ui/Badge';
import { Heart, Trophy, Zap, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export interface FallingHeaderProps {
  status: GameStatus;
  score: number;
  lives: number;
  maxLives: number;
  adaptiveLevel: number;
  wpm: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export function FallingHeader({
  status,
  score,
  lives,
  maxLives,
  adaptiveLevel,
  wpm,
  onStart,
  onPause,
  onResume,
  onRestart,
}: FallingHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-sm">
      {/* Title & Adaptive Level Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#111827]">Falling Words</h1>
          <Badge variant={status === 'PLAYING' ? 'success' : status === 'PAUSED' ? 'warning' : 'primary'}>
            {status}
          </Badge>
          <Badge variant="outline" className="text-[#D68910] border-[#F39C12]/40 bg-amber-50 font-mono text-xs">
            Adaptive Lvl {adaptiveLevel}
          </Badge>
        </div>
        <p className="text-xs text-[#64748B]">
          Type the falling words before they hit the danger zone. Difficulty adapts smoothly.
        </p>
      </div>

      {/* Live Stats Bar */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-between sm:justify-start">
        {/* Score Display */}
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-[#111827] bg-slate-100 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          <span>{score} pts</span>
        </div>

        {/* Live WPM */}
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-[#111827] bg-slate-100 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200">
          <Zap className="h-3.5 w-3.5 text-[#F39C12]" />
          <span>{wpm} WPM</span>
        </div>

        {/* Lives / Health Hearts */}
        <div className="flex items-center gap-1">
          {Array.from({ length: maxLives }).map((_, idx) => (
            <Heart
              key={idx}
              className={`h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-200 ${
                idx < lives
                  ? 'fill-destructive text-destructive scale-100'
                  : 'text-muted-foreground/30 scale-90'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
        {status === 'IDLE' && (
          <Button onClick={onStart} variant="primary" size="md" glow className="w-full sm:w-auto">
            <Play className="h-4 w-4" /> Play Game (Enter)
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

        {(status === 'PLAYING' || status === 'PAUSED' || status === 'GAME_OVER') && (
          <Button onClick={onRestart} variant="secondary" size="md" className="flex-1 sm:flex-none">
            <RotateCcw className="h-4 w-4" /> Restart
          </Button>
        )}
      </div>
    </div>
  );
}
