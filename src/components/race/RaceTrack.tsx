import React from 'react';
import { Flag, Zap, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RaceTrackProps {
  progressPercentage: number;
  wpm: number;
  className?: string;
}

/**
 * Standard Side-View Supercar Component
 * Renders a side-profile sports car driving horizontally across the track
 */
function SideViewRaceCar({ wpm, isMoving }: { wpm: number; isMoving: boolean }) {
  return (
    <div className="relative flex items-center">
      {/* Nitro Flame & Smoke Trail (Rear Exhaust when driving) */}
      {isMoving && (
        <div className="absolute -left-10 top-[60%] -translate-y-1/2 flex items-center z-0 pointer-events-none animate-exhaust">
          {/* Outer Flame Glow */}
          <div className="w-9 h-4 rounded-full bg-gradient-to-l from-amber-400 via-orange-500 to-red-600 blur-[1px] opacity-95" />
          {/* Cyan Nitro Flame Core */}
          <div className="absolute right-0 w-4 h-2 rounded-full bg-cyan-300 blur-[0.5px]" />
          {/* Drifting Exhaust Smoke */}
          <div className="absolute -left-6 w-6 h-3 rounded-full bg-slate-400/40 blur-xs" />
        </div>
      )}

      {/* SVG Side-View Supercar Graphic */}
      <svg
        viewBox="0 0 170 70"
        className="w-28 sm:w-36 h-12 sm:h-16 drop-shadow-[0_8px_16px_rgba(168,85,247,0.5)] transition-transform duration-200 z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Side Paint Gradient */}
          <linearGradient id="sideCarPaint" x1="0" y1="20" x2="160" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#68d391" />
            <stop offset="0%" stopColor="#7e22ce" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Windshield & Side Glass Reflection */}
          <linearGradient id="sideWindowGrad" x1="45" y1="18" x2="105" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>

          {/* Headlight Forward Beam */}
          <linearGradient id="sideHeadlightBeam" x1="150" y1="42" x2="170" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          {/* Wheel Alloy Rim Metallic */}
          <radialGradient id="alloyRim" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#94a3b8" />
            <stop offset="85%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>

          {/* Brake Caliper Orange */}
          <linearGradient id="brakeCaliper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>

        {/* Headlight Projection Beam */}
        <polygon points="148,36 170,22 170,55 148,46" fill="url(#sideHeadlightBeam)" />

        {/* Rear High-Mount Sports Wing / Spoiler */}
        <path d="M 8 18 L 26 18 L 24 23 L 14 23 Z" fill="#7e22ce" stroke="#c084fc" strokeWidth="1" />
        <rect x="15" y="23" width="3.5" height="12" fill="#0f172a" />
        <rect x="22" y="23" width="3.5" height="12" fill="#0f172a" />

        {/* Side Car Body Base Silhouette */}
        <path
          d="M 10 46 C 8 36, 16 32, 28 32 C 40 32, 48 20, 68 17 C 88 15, 106 18, 118 28 C 132 30, 146 36, 154 41 C 158 43.5, 158 47.5, 154 48 C 144 50, 134 50, 10 48 Z"
          fill="url(#sideCarPaint)"
          stroke="#f3e8ff"
          strokeWidth="1.2"
        />

        {/* Aerodynamic Roof & Side Windows */}
        <path
          d="M 50 30 C 58 20, 75 18, 92 19 C 105 20, 112 28, 114 30 Z"
          fill="url(#sideWindowGrad)"
          stroke="#7dd3fc"
          strokeWidth="1"
        />
        {/* Window Divider Pillar B */}
        <line x1="82" y1="19" x2="82" y2="30" stroke="#0f172a" strokeWidth="2.5" />

        {/* Body Accent Lines & Door Panels */}
        <path d="M 32 40 L 138 40" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        <path d="M 60 30 L 64 46" stroke="#581c87" strokeWidth="1.5" opacity="0.8" />
        <path d="M 84 30 L 88 46" stroke="#581c87" strokeWidth="1.5" opacity="0.8" />

        {/* Side Air Intake Vent near Rear Fender */}
        <path d="M 44 36 L 52 36 L 48 44 L 42 44 Z" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />

        {/* Front LED Headlight Lens */}
        <path d="M 144 38 C 152 40, 154 43, 146 45 Z" fill="#ffffff" />
        <path d="M 144 38 C 152 40, 154 43, 146 45 Z" fill="#38bdf8" opacity="0.6" />

        {/* Rear LED Red Tail Light Strip */}
        <rect x="9" y="36" width="6" height="7" rx="1.5" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
        <rect x="10" y="38" width="4" height="3" fill="#fef2f2" />

        {/* Front & Rear Wheel Well Cutouts */}
        <circle cx="40" cy="48" r="15" fill="#020617" />
        <circle cx="122" cy="48" r="15" fill="#020617" />

        {/* REAR WHEEL (Side Profile) */}
        <g id="rearWheel">
          {/* Tire Rubber */}
          <circle cx="40" cy="48" r="13" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          {/* Orange Brake Caliper */}
          <path d="M 34 40 A 10 10 0 0 1 44 40 L 42 43 A 7 7 0 0 0 36 43 Z" fill="url(#brakeCaliper)" />
          {/* Chrome Alloy Rim */}
          <circle cx="40" cy="48" r="8.5" fill="url(#alloyRim)" stroke="#cbd5e1" strokeWidth="0.8" />
          {/* Rim Spokes */}
          <line x1="40" y1="40" x2="40" y2="56" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="32" y1="48" x2="48" y2="48" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="34" y1="42" x2="46" y2="54" stroke="#f8fafc" strokeWidth="1" />
          <line x1="46" y1="42" x2="34" y2="54" stroke="#f8fafc" strokeWidth="1" />
          {/* Center Hub Cap */}
          <circle cx="40" cy="48" r="2.5" fill="#0284c7" stroke="#ffffff" strokeWidth="0.5" />
        </g>

        {/* FRONT WHEEL (Side Profile) */}
        <g id="frontWheel">
          {/* Tire Rubber */}
          <circle cx="122" cy="48" r="13" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          {/* Orange Brake Caliper */}
          <path d="M 116 40 A 10 10 0 0 1 126 40 L 124 43 A 7 7 0 0 0 118 43 Z" fill="url(#brakeCaliper)" />
          {/* Chrome Alloy Rim */}
          <circle cx="122" cy="48" r="8.5" fill="url(#alloyRim)" stroke="#cbd5e1" strokeWidth="0.8" />
          {/* Rim Spokes */}
          <line x1="122" y1="40" x2="122" y2="56" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="114" y1="48" x2="130" y2="48" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="116" y1="42" x2="128" y2="54" stroke="#f8fafc" strokeWidth="1" />
          <line x1="128" y1="42" x2="116" y2="54" stroke="#f8fafc" strokeWidth="1" />
          {/* Center Hub Cap */}
          <circle cx="122" cy="48" r="2.5" fill="#0284c7" stroke="#ffffff" strokeWidth="0.5" />
        </g>

        {/* Front Low Splitter Bumper */}
        <rect x="146" y="47" width="12" height="3" rx="1" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function RaceTrack({ progressPercentage, wpm, className }: RaceTrackProps) {
  const clampedProgress = Math.min(100, Math.max(0, progressPercentage));
  const isMoving = wpm > 0 && clampedProgress > 0 && clampedProgress < 100;

  return (
    <div className={cn('flex flex-col gap-3 rounded-2xl border border-border/80 bg-card/90 p-4 sm:p-5 shadow-lg backdrop-blur-md', className)}>
      {/* Track Header Title & Progress */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent animate-pulse" />
          <span className="text-foreground font-mono">F1 Speed Track</span>
        </div>
        <div className="flex items-center gap-3">
          {wpm > 0 && (
            <span className="flex items-center gap-1 font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/30">
              <Flame className="h-3.5 w-3.5 text-warning animate-bounce" /> {wpm} WPM
            </span>
          )}
          <span className="font-mono text-primary font-black text-sm sm:text-base">
            {clampedProgress}%
          </span>
        </div>
      </div>

      {/* Main Track Environment (Side-View Road Horizon) */}
      <div className="relative mt-1 h-28 sm:h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-2 overflow-hidden border-2 border-slate-800 shadow-inner flex items-end pb-2">
        {/* Top Boundary Line & Distant Sky Silhouette */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-slate-900 border-b border-slate-700/60" />

        {/* Road Surface Asphalt */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-slate-950 border-t border-slate-700/80" />

        {/* Yellow Double Center Road Line */}
        <div className="absolute left-0 right-0 bottom-9 h-1 bg-amber-400/80 opacity-90" />

        {/* White Dashed Road Markings */}
        <div className="absolute left-0 right-0 bottom-4 h-0 border-t-2 border-dashed border-slate-400/60 z-0 pointer-events-none" />

        {/* Start Line Pole & Marker */}
        <div className="absolute left-4 top-3 bottom-1 w-3 flex flex-col justify-center items-center border-r-2 border-slate-500 opacity-70 z-0">
          <span className="text-[9px] font-mono font-bold text-slate-300 rotate-90 uppercase tracking-widest">
            START
          </span>
        </div>

        {/* Checkered Finish Line Banner */}
        <div className="absolute right-2 top-3 bottom-1 w-9 bg-checkered rounded-t border-t-2 border-x-2 border-white/60 flex flex-col justify-center items-center shadow-lg z-10">
          <div className="bg-background/90 p-1.5 rounded-full border border-primary/50 shadow">
            <Flag className="h-4 w-4 text-accent" />
          </div>
        </div>

        {/* Moving Racer Car Container (Drives horizontally left-to-right) */}
        <div
          className="absolute bottom-1 transition-all duration-300 ease-out flex flex-col items-center z-20"
          style={{
            // Smooth positioning: starting offset left at 10px up to finish banner
            left: `calc(10px + (${clampedProgress}% * 0.76))`,
          }}
        >
          {/* Floating WPM Speed Badge directly above car roof */}
          <div className="mb-1 flex items-center gap-1 rounded-full bg-slate-900/95 px-2.5 py-0.5 text-[11px] font-black font-mono text-accent border border-accent/40 shadow-lg glow-accent whitespace-nowrap">
            <span>🏎️</span>
            <span>{wpm} WPM</span>
          </div>

          {/* Standard Side-View Supercar Graphic */}
          <SideViewRaceCar wpm={wpm} isMoving={isMoving} />
        </div>
      </div>
    </div>
  );
}
