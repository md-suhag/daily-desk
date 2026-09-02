'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TextPromptDisplayProps {
  targetText: string;
  typedInput: string;
  cursorIndex: number;
  isFocused?: boolean;
}

export function TextPromptDisplay({
  targetText,
  typedInput,
  cursorIndex,
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
      className={cn(
        'relative min-h-[140px] max-h-[220px] overflow-y-auto rounded-2xl border bg-card/90 p-6 shadow-inner font-mono text-xl sm:text-2xl leading-relaxed tracking-wide transition-all duration-200 select-none',
        isFocused ? 'border-primary/60 ring-2 ring-primary/20' : 'border-border'
      )}
      tabIndex={0}
      aria-label="Typing text prompt"
    >
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
              'relative rounded transition-colors duration-100',
              isCorrect && 'text-success font-semibold',
              isIncorrect && 'bg-destructive/30 text-destructive-foreground font-semibold border-b-2 border-destructive',
              !isTyped && !isCurrent && 'text-muted-foreground/60',
              isCurrent && 'text-foreground font-bold bg-primary/20 ring-1 ring-primary'
            )}
          >
            {/* Visual indicator for space errors */}
            {isIncorrect && char === ' ' ? '·' : char}

            {/* Caret line for active character */}
            {isCurrent && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary animate-caret" />
            )}
          </span>
        );
      })}
    </div>
  );
}
