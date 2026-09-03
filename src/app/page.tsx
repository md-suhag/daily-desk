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
    <div className="flex flex-col gap-8 sm:gap-16 lg:gap-20 py-2 sm:py-8">
      {/* Hero Header Section */}
      <section className="flex flex-col items-center text-center gap-4 sm:gap-6 py-4 sm:py-14 md:py-20">
        <Badge variant="outline" className="px-4 py-1.5 text-xs sm:text-sm font-bold border-[#F39C12]/40 bg-amber-500/10 text-[#F39C12] shadow-xs">
          🚀 Next-Gen Typing Trainer
        </Badge>
        
        {/* Large Prominent Hero Gradient Title */}
        <h1 className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl leading-[1.1] sm:leading-[1.08]">
          <span className="bg-gradient-to-r from-foreground via-amber-500 to-[#F39C12] bg-clip-text text-transparent">
            Level Up Your Typing Speed & Accuracy
          </span>
        </h1>
        
        <p className="text-xs sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-2 font-normal leading-relaxed">
          Forge flawless muscle memory through immersive, replayable typing games with real-time feedback and adaptive difficulty.
        </p>

        {/* Quick Hero Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 sm:mt-4 w-full sm:w-auto">
          <Link href="/race" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-[#F39C12] hover:bg-[#D68910] text-white font-black px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg shadow-md hover:shadow-lg">
              Start Typing Race <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
          <Link href="/falling" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-border text-foreground hover:bg-secondary px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold">
              Play Falling Words
            </Button>
          </Link>
        </div>
      </section>

      {/* Local Performance Overview Section */}
      <section className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-[#F39C12]" />
            Personal Best Records
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-6">
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

      {/* Game Selection Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Typing Race Game Card */}
        <Card className="flex flex-col justify-between border-border bg-card shadow-sm hover:shadow-md hover:border-[#F39C12]/50 transition-all duration-300 rounded-3xl">
          <CardHeader className="p-4 xs:p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-[#F39C12] border border-[#F39C12]/30 shadow-xs">
                <Flag className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <Badge variant="outline" className="border-[#F39C12]/40 bg-amber-500/10 text-[#F39C12] font-bold text-[11px] sm:text-xs">Sentence Race</Badge>
            </div>
            <CardTitle className="mt-3 sm:mt-4 text-xl sm:text-3xl font-black text-foreground">Typing Race</CardTitle>
            <CardDescription className="text-xs sm:text-base text-muted-foreground mt-1 leading-relaxed">
              Type sentences with precision. Race your visual supercar avatar while tracking real-time WPM, Net WPM, accuracy, and error rates.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:gap-5 p-4 xs:p-6 sm:p-8 pt-0">
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground border-t border-border pt-3 sm:pt-4">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 xs:gap-2">
                <span>Content Complexity:</span>
                <span className="font-bold text-foreground">Easy • Medium • Hard</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 xs:gap-2">
                <span>Focus:</span>
                <span className="font-bold text-foreground">Sentence accuracy & speed</span>
              </div>
            </div>
            <Link href="/race" className="w-full mt-1 sm:mt-2">
              <Button size="lg" className="w-full bg-[#F39C12] hover:bg-[#D68910] text-white font-black py-3 sm:py-3.5 text-sm sm:text-lg shadow-md">
                Play Typing Race <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Falling Words Game Card */}
        <Card className="flex flex-col justify-between border-border bg-card shadow-sm hover:shadow-md hover:border-[#F39C12]/50 transition-all duration-300 rounded-3xl">
          <CardHeader className="p-4 xs:p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-[#F39C12] border border-[#F39C12]/30 shadow-xs">
                <Flame className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <Badge variant="outline" className="border-[#F39C12]/40 bg-amber-500/10 text-[#F39C12] font-bold text-[11px] sm:text-xs">Arcade Mode</Badge>
            </div>
            <CardTitle className="mt-3 sm:mt-4 text-xl sm:text-3xl font-black text-foreground">Falling Words</CardTitle>
            <CardDescription className="text-xs sm:text-base text-muted-foreground mt-1 leading-relaxed">
              Destroy words falling from above before they breach the danger line. Features smooth 60fps animations and adaptive difficulty.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:gap-5 p-4 xs:p-6 sm:p-8 pt-0">
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground border-t border-border pt-3 sm:pt-4">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 xs:gap-2">
                <span>Difficulty System:</span>
                <span className="font-bold text-foreground">Adaptive DDA Scaling</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 xs:gap-2">
                <span>Focus:</span>
                <span className="font-bold text-foreground">Quick reflex & word typing</span>
              </div>
            </div>
            <Link href="/falling" className="w-full mt-1 sm:mt-2">
              <Button size="lg" className="w-full bg-[#F39C12] hover:bg-[#D68910] text-white font-black py-3 sm:py-3.5 text-sm sm:text-lg shadow-md">
                Play Falling Words <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Feature Principles Banner Section */}
      <section className="rounded-3xl border border-border bg-card p-4 xs:p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-[#F39C12] border border-[#F39C12]/20">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="flex flex-col text-left gap-0.5">
            <h4 className="font-extrabold text-xs sm:text-base text-foreground">Zero Distractions & Local Engine</h4>
            <p className="text-[11px] sm:text-sm text-muted-foreground">
              Pure client-side game engine computing all metrics with millisecond precision.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-sm text-muted-foreground shrink-0 bg-secondary px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-border">
          <Keyboard className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F39C12]" /> Press Enter to start games
        </div>
      </section>
    </div>
  );
}
