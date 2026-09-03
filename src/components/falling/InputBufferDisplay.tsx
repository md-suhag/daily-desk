'use client';

import React from 'react';
import { Keyboard, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputBufferDisplayProps {
  activeInput: string;
  isFocused?: boolean;
  onClearInput?: () => void;
  onClickContainer?: () => void;
}

export function InputBufferDisplay({
  activeInput,
  isFocused = true,
  onClearInput,
  onClickContainer,
}: InputBufferDisplayProps) {
  const handleClick = () => {
    if (onClickContainer) {
      onClickContainer();
    }
  };

  const handleClear = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (onClearInput) {
      onClearInput();
    }
  };

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleClick}
      className={cn(
        'flex items-center justify-between rounded-2xl border bg-card p-4 sm:p-5 shadow-sm font-mono transition-all duration-200 cursor-pointer select-none',
        isFocused ? 'border-[#F39C12] ring-2 ring-[#F39C12]/20' : 'border-border'
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <Keyboard className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
          Active Buffer:
        </span>
      </div>

      <div className="flex items-center gap-2 text-base sm:text-xl font-bold font-mono">
        {activeInput.length > 0 ? (
          <div className="flex items-center gap-1.5 bg-amber-500/20 px-3 py-1 rounded-lg border border-[#F39C12]/40 tracking-wider text-foreground">
            <span>{activeInput}</span>
            {onClearInput && (
              <button
                type="button"
                onClick={handleClear}
                onTouchStart={handleClear}
                aria-label="Clear active buffer"
                className="text-muted-foreground hover:text-destructive focus:outline-none transition-colors ml-1"
              >
                <XCircle className="h-4 w-4 fill-current/20" />
              </button>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground/60 text-xs sm:text-sm font-normal italic">
            Type word characters directly...
          </span>
        )}
        <span className="h-5 w-0.5 bg-[#F39C12] animate-caret ml-1" />
      </div>
    </div>
  );
}

