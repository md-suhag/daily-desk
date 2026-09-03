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
        'flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm font-mono transition-all duration-200',
        isFocused ? 'border-[#F39C12] ring-2 ring-[#F39C12]/20' : 'border-[#E5E7EB]'
      )}
    >
      <div className="flex items-center gap-3">
        <Keyboard className="h-5 w-5 text-[#64748B]" />
        <span className="text-xs uppercase font-semibold text-[#64748B] tracking-wider">
          Active Buffer:
        </span>
      </div>

      <div className="flex items-center gap-1 text-lg sm:text-xl font-bold font-mono">
        {activeInput.length > 0 ? (
          <span className="text-[#111827] bg-[#FEF3C7] px-3 py-1 rounded-lg border border-[#F39C12]/40 tracking-wider">
            {activeInput}
          </span>
        ) : (
          <span className="text-[#64748B]/60 text-sm font-normal italic">
            Type word characters directly...
          </span>
        )}
        <span className="h-5 w-0.5 bg-[#F39C12] animate-caret ml-1" />
      </div>
    </div>
  );
}
