'use client';

import React from 'react';
import { Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputBufferDisplayProps {
  activeInput: string;
  isFocused?: boolean;
}

export function InputBufferDisplay({ activeInput, isFocused = true }: InputBufferDisplayProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-xl border bg-card/95 p-4 shadow-md font-mono transition-all duration-200',
        isFocused ? 'border-primary/60 ring-2 ring-primary/20' : 'border-border'
      )}
    >
      <div className="flex items-center gap-3">
        <Keyboard className="h-5 w-5 text-muted-foreground" />
        <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
          Active Buffer:
        </span>
      </div>

      <div className="flex items-center gap-1 text-lg sm:text-xl font-bold font-mono">
        {activeInput.length > 0 ? (
          <span className="text-accent bg-accent/10 px-3 py-1 rounded-lg border border-accent/30 tracking-wider">
            {activeInput}
          </span>
        ) : (
          <span className="text-muted-foreground/50 text-sm font-normal italic">
            Type word characters directly...
          </span>
        )}
        <span className="h-5 w-0.5 bg-accent animate-caret ml-1" />
      </div>
    </div>
  );
}
