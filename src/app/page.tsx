'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/common/StatCard';
import { useGameStats } from '@/hooks/useGameStats';
import { Flag, Flame, Trophy, Zap, Target, ArrowRight, Keyboard, ShieldCheck } from 'lucide-react';

export default function HubPage() {
  const { stats, isLoaded } = useGameStats();

  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      {/* Hero Header */}
      <section className="flex flex-col items-center text-center gap-3 sm:gap-4 py-4 sm:py-6">
        <Badge variant="outline" className="px-3 py-1 text-xs border-[#F39C12]/40 bg-amber-50 text-[#D68910]">
          🚀 Next-Gen Typing Trainer
        </Badge>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111827] max-w-3xl leading-tight">
          Level Up Your Typing Speed & <span className="text-[#F39C12]">Accuracy</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[#64748B] max-w-2xl px-2">
          Forge flawless muscle memory through immersive, replayable typing games with real-time feedback and adaptive difficulty.
        </p>
      </section>

      {/* Local Performance Overview */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2">
          <Trophy className="h-4 w-4 text-[#F39C12]" />
          Personal Best Records
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <StatCard
            label="Best Race Speed"
            value={isLoaded ? `${stats.bestRaceWPM}` : '0'}
            unit="WPM"
            icon={Zap}
            color="primary"
          />
          <StatCard
            label="Race Accuracy"
            value={isLoaded ? `${stats.bestRaceAccuracy}%` : '0%'}
            icon={Target}
            color="success"
          />
          <StatCard
            label="Falling High Score"
            value={isLoaded ? `${stats.bestFallingScore}` : '0'}
            unit="pts"
            icon={Flame}
            color="warning"
          />
          <StatCard
            label="Falling Peak Speed"
            value={isLoaded ? `${stats.bestFallingWPM}` : '0'}
            unit="WPM"
            icon={Trophy}
            color="accent"
          />
        </div>
      </section>

      {/* Game Selection Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Typing Race Game Card */}
        <Card className="flex flex-col justify-between border-[#E5E7EB] bg-white shadow-sm hover:shadow-md hover:border-[#F39C12]/50 transition-all duration-300">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#D68910] border border-[#F39C12]/30">
                <Flag className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <Badge variant="outline" className="border-[#F39C12]/40 bg-amber-50 text-[#D68910]">Sentence Race</Badge>
            </div>
            <CardTitle className="mt-3 text-xl sm:text-2xl font-extrabold text-[#111827]">Typing Race</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-[#64748B]">
              Type sentences with precision. Race your visual supercar avatar while tracking real-time WPM, Net WPM, accuracy, and error rates.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4 sm:p-6 pt-0">
            <div className="flex flex-col gap-1 text-xs text-[#64748B] border-t border-[#E5E7EB] pt-3">
              <div className="flex justify-between">
                <span>Content Complexity:</span>
                <span className="font-semibold text-[#111827]">Easy • Medium • Hard</span>
              </div>
              <div className="flex justify-between">
                <span>Focus:</span>
                <span className="font-semibold text-[#111827]">Sentence accuracy & speed</span>
              </div>
            </div>
            <Link href="/race" className="w-full mt-2">
              <Button variant="primary" size="lg" className="w-full bg-[#F39C12] hover:bg-[#D68910] text-white font-bold shadow-sm">
                Play Typing Race <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Falling Words Game Card */}
        <Card className="flex flex-col justify-between border-[#E5E7EB] bg-white shadow-sm hover:shadow-md hover:border-[#F39C12]/50 transition-all duration-300">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-amber-100 text-[#D68910] border border-[#F39C12]/30">
                <Flame className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700">Arcade Mode</Badge>
            </div>
            <CardTitle className="mt-3 text-xl sm:text-2xl font-extrabold text-[#111827]">Falling Words</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-[#64748B]">
              Destroy words falling from above before they breach the danger line. Features smooth 60fps animations and adaptive difficulty.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4 sm:p-6 pt-0">
            <div className="flex flex-col gap-1 text-xs text-[#64748B] border-t border-[#E5E7EB] pt-3">
              <div className="flex justify-between">
                <span>Difficulty System:</span>
                <span className="font-semibold text-[#111827]">Adaptive DDA Scaling</span>
              </div>
              <div className="flex justify-between">
                <span>Focus:</span>
                <span className="font-semibold text-[#111827]">Quick reflex & word typing</span>
              </div>
            </div>
            <Link href="/falling" className="w-full mt-2">
              <Button variant="primary" size="lg" className="w-full bg-[#F39C12] hover:bg-[#D68910] text-white font-bold shadow-sm">
                Play Falling Words <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Feature Principles Banner */}
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#F39C12]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left">
            <h4 className="font-bold text-xs sm:text-sm text-[#111827]">Zero Distractions & Local Engine</h4>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Pure client-side game engine computing all metrics with millisecond precision.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] shrink-0">
          <Keyboard className="h-4 w-4" /> Press Enter to start games
        </div>
      </section>
    </div>
  );
}
