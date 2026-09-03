'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GameStatus } from '@/types/game';
import { Play } from 'lucide-react';

export interface TextPromptDisplayProps {
  targetText: string;
  typedInput: string;
  cursorIndex: number;
  status: GameStatus;
  onStart: () => void;
  isFocused?: boolean;
}

export function TextPromptDisplay({
  targetText,
  typedInput,
  cursorIndex,
  status,
  onStart,
  isFocused = true,
}: TextPromptDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Keep active typed character smoothly scrolled into view if prompt overflows
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const activeElement = activeCharRef.current;
      const container = containerRef.current;
      const offsetTop = activeElement.offsetTop;
      const containerHeight = container.clientHeight;

      if (offsetTop > container.scrollTop + containerHeight - 60) {
        container.scrollTop = offsetTop - 40;
      } else if (offsetTop < container.scrollTop) {
        container.scrollTop = offsetTop - 20;
      }
    }
  }, [cursorIndex]);

  return (
    <div
      ref={containerRef}
      onClick={status === 'IDLE' ? onStart : undefined}
      className={cn(
        'relative min-h-[150px] sm:min-h-[180px] max-h-[260px] overflow-y-auto rounded-3xl border bg-card p-6 sm:p-8 shadow-sm font-mono text-lg sm:text-2xl md:text-3xl leading-relaxed tracking-wide transition-all duration-200 select-none break-words',
        status === 'IDLE' ? 'cursor-pointer hover:border-[#F39C12]' : '',
        isFocused ? 'border-[#F39C12] ring-2 ring-[#F39C12]/20' : 'border-border'
      )}
      tabIndex={0}
      aria-label="Typing text prompt"
    >
      {/* Click / Key start banner when IDLE */}
      {status === 'IDLE' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-card/90 backdrop-blur-xs p-4 text-center rounded-2xl">
          <div className="flex items-center gap-2 font-sans text-sm sm:text-base font-bold text-[#F39C12]">
            <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-[#F39C12]" />
            <span>Click prompt or press any key / Enter to Start Race</span>
          </div>
        </div>
      )}

      {targetText.split('').map((char, idx) => {
        const isTyped = idx < typedInput.length;
        const isCurrent = idx === cursorIndex;
        const isCorrect = isTyped && typedInput[idx] === char;
        const isIncorrect = isTyped && typedInput[idx] !== char;

        return (
          <span
            key={idx}
            ref={isCurrent ? activeCharRef : null}
            className={cn(
              'relative rounded px-0.5 transition-colors duration-100',
              isCorrect && 'text-[#F39C12] font-extrabold',
              isIncorrect && 'bg-red-500/20 text-red-500 font-bold border-b-2 border-red-500',
              !isTyped && !isCurrent && 'text-muted-foreground/50',
              isCurrent && 'text-foreground font-extrabold bg-amber-500/20 ring-1 ring-amber-400'
            )}
          >
            {/* Visual indicator for space errors */}
            {isIncorrect && char === ' ' ? '·' : char}

            {/* Caret line for active character */}
            {isCurrent && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F39C12] animate-caret" />
            )}
          </span>
        );
      })}
    </div>
  );
}
