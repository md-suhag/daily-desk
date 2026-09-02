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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
      {/* Title & Adaptive Level Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Falling Words</h1>
          <Badge variant={status === 'PLAYING' ? 'success' : status === 'PAUSED' ? 'warning' : 'primary'}>
            {status}
          </Badge>
          <Badge variant="outline" className="text-accent border-accent/40 font-mono">
            Adaptive Lvl {adaptiveLevel}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Type the falling words before they hit the danger zone. Difficulty adapts smoothly.
        </p>
      </div>

      {/* Live Stats Bar */}
      <div className="flex items-center gap-4">
        {/* Score Display */}
        <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-foreground bg-secondary/80 px-3 py-1.5 rounded-lg border border-border">
          <Trophy className="h-4 w-4 text-warning" />
          <span>{score} pts</span>
        </div>

        {/* Live WPM */}
        <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-foreground bg-secondary/80 px-3 py-1.5 rounded-lg border border-border">
          <Zap className="h-4 w-4 text-primary" />
          <span>{wpm} WPM</span>
        </div>

        {/* Lives / Health Hearts */}
        <div className="flex items-center gap-1">
          {Array.from({ length: maxLives }).map((_, idx) => (
            <Heart
              key={idx}
              className={`h-5 w-5 transition-transform duration-200 ${
                idx < lives
                  ? 'fill-destructive text-destructive scale-100'
                  : 'text-muted-foreground/30 scale-90'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {status === 'IDLE' && (
          <Button onClick={onStart} variant="primary" size="md" glow>
            <Play className="h-4 w-4" /> Play Game (Enter)
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

        {(status === 'PLAYING' || status === 'PAUSED' || status === 'GAME_OVER') && (
          <Button onClick={onRestart} variant="secondary" size="md">
            <RotateCcw className="h-4 w-4" /> Restart
          </Button>
        )}
      </div>
    </div>
  );
}
