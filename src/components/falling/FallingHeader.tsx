'use client';

import React from 'react';
import { GameStatus } from '@/types/game';
import { Badge } from '@/components/ui/Badge';
import { Heart, Trophy, Zap } from 'lucide-react';
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
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm transition-colors duration-200">
      {/* Title & Adaptive Level Info */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl sm:text-3xl font-black tracking-tight text-foreground">Falling Words</h1>
          <Badge variant={status === 'PLAYING' ? 'success' : status === 'PAUSED' ? 'warning' : 'primary'} className="px-3 py-1 text-xs font-bold">
            {status}
          </Badge>
          <Badge variant="outline" className="text-[#F39C12] border-[#F39C12]/40 bg-amber-500/10 font-mono text-xs font-bold px-3 py-1">
            Adaptive Lvl {adaptiveLevel}
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Type the falling words before they hit the danger zone. Difficulty adapts smoothly.
        </p>
      </div>

      {/* Live Stats Bar */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap justify-between sm:justify-start">
        {/* Score Display */}
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-foreground bg-secondary px-3 py-2 rounded-xl border border-border">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span>{score} pts</span>
        </div>

        {/* Live WPM */}
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-foreground bg-secondary px-3 py-2 rounded-xl border border-border">
          <Zap className="h-4 w-4 text-[#F39C12]" />
          <span>{wpm} WPM</span>
        </div>

        {/* Lives / Health Hearts */}
        <div className="flex items-center gap-1 bg-secondary p-2 rounded-xl border border-border">
          {Array.from({ length: maxLives }).map((_, idx) => (
            <Heart
              key={idx}
              className={`h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-200 ${
                idx < lives
                  ? 'fill-red-500 text-red-500 scale-100'
                  : 'text-muted-foreground/30 scale-90'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto mt-2 sm:mt-0">
        {status === 'IDLE' && (
          <Button onClick={onStart} variant="primary" size="lg" className="w-full sm:w-auto bg-[#F39C12] hover:bg-[#D68910] text-white font-black px-6 py-3 text-base shadow-sm">
            <Play className="h-4 w-4 fill-white" /> Play Game (Enter)
          </Button>
        )}

        {status === 'PLAYING' && (
          <Button onClick={onPause} variant="outline" size="lg" className="flex-1 sm:flex-none font-bold border-border text-foreground hover:bg-secondary">
            <Pause className="h-4 w-4" /> Pause (Esc)
          </Button>
        )}

        {status === 'PAUSED' && (
          <Button onClick={onResume} variant="primary" size="lg" className="flex-1 sm:flex-none bg-[#F39C12] hover:bg-[#D68910] text-white font-black">
            <Play className="h-4 w-4 fill-white" /> Resume
          </Button>
        )}

        {(status === 'PLAYING' || status === 'PAUSED' || status === 'GAME_OVER') && (
          <Button onClick={onRestart} variant="secondary" size="lg" className="flex-1 sm:flex-none font-bold bg-secondary text-foreground hover:bg-secondary/80">
            <RotateCcw className="h-4 w-4" /> Restart
          </Button>
        )}
      </div>
    </div>
  );
}
