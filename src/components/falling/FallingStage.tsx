'use client';

import React from 'react';
import { FallingWord } from '@/types/falling';
import { GameStatus } from '@/types/game';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export interface FallingStageProps {
  words: FallingWord[];
  activeInput: string;
  status: GameStatus;
  onStart: () => void;
}

export function FallingStage({ words, activeInput, status, onStart }: FallingStageProps) {
  return (
    <div
      onClick={status === 'IDLE' ? onStart : undefined}
      className={cn(
        'relative w-full h-[360px] xs:h-[400px] sm:h-[480px] rounded-2xl border border-border/80 bg-card/90 overflow-hidden shadow-inner select-none flex flex-col justify-between transition-colors duration-200 backdrop-blur-md',
        status === 'IDLE' ? 'cursor-pointer hover:border-primary/50' : ''
      )}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Start Prompt Overlay when IDLE */}
      {status === 'IDLE' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-xs p-4 sm:p-6 text-center animate-pop-in">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg glow-primary">
            <Play className="h-6 w-6 sm:h-7 sm:w-7 ml-1" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Click or Press Any Key to Start</h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Words will start falling from the top. Type each word letter-by-letter to destroy it before it reaches the bottom danger zone!
          </p>
        </div>
      )}

      {status === 'PAUSED' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-xs p-4 sm:p-6 text-center">
          <span className="text-2xl sm:text-3xl font-black text-warning">GAME PAUSED</span>
          <span className="text-xs text-muted-foreground">Press Esc or click Resume to continue</span>
        </div>
      )}

      {/* Danger Zone Bottom Boundary Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-9 sm:h-10 border-t-2 border-dashed border-destructive/50 bg-destructive/10 flex items-center justify-center pointer-events-none z-10">
        <span className="text-[10px] uppercase font-bold tracking-widest text-destructive/80">
          Danger Zone
        </span>
      </div>

      {/* Render Falling Words */}
      {words.map((word) => {
        const isTargeted = word.isTargeted;
        const matchedLen = word.matchedCharsCount;
        // Clamp x position between 12% and 88% to prevent edge truncation on mobile screens
        const safeX = Math.max(12, Math.min(88, word.xPercent));

        return (
          <div
            key={word.id}
            className={cn(
              'absolute transform -translate-x-1/2 rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-mono text-xs sm:text-base font-bold shadow-lg border transition-transform duration-100 whitespace-nowrap',
              isTargeted
                ? 'bg-primary text-primary-foreground border-accent scale-110 glow-accent z-20 ring-2 ring-accent'
                : 'bg-secondary/95 text-secondary-foreground border-border/80 z-10'
            )}
            style={{
              left: `${safeX}%`,
              top: `${word.yPercent}%`,
            }}
          >
            {/* Highlight typed characters inside target word */}
            {word.text.split('').map((char, charIdx) => {
              const isMatched = isTargeted && charIdx < matchedLen;
              return (
                <span
                  key={charIdx}
                  className={cn(
                    isMatched ? 'text-accent font-black underline underline-offset-4' : ''
                  )}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
