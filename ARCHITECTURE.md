# DailyDesk — Platform Architecture, Vision & Ecosystem Blueprint

Welcome to **DailyDesk**. This document serves as the master architectural reference, system vision, and extension blueprint for developers and AI coding assistants working on the platform.

---

## 🌟 1. Project Vision & Purpose

DailyDesk is a modern, enterprise-grade **Daily Productivity, Skill Development, and Career Tools Ecosystem** designed for developers, students, and professionals.

While **Phase 1** focuses on interactive typing mastery games (Typing Race & Falling Words), the platform is architected to scale into a unified daily suite containing career acceleration tools (Resume Builder, ATS Analyzer), AI assistance, productivity utilities, and global skill leaderboards.

```
                               ┌───────────────────────────────────────────┐
                               │                 DailyDesk                 │
                               │  (All-in-One Daily Productivity Suite)   │
                               └─────────────────────┬─────────────────────┘
                                                     │
         ┌───────────────────┬───────────────────────┼───────────────────────┬───────────────────┐
         │                   │                       │                       │                   │
         ▼                   ▼                       ▼                       ▼                   ▼
 ┌───────────────┐   ┌───────────────┐       ┌───────────────┐       ┌───────────────┐   ┌───────────────┐
 │ Typing Games  │   │ Resume Builder│       │ ATS Analyzer  │       │  AI Suite     │   │ Daily Tools   │
 │ (Race, Arcade)│   │  & CV Engine  │       │  & Keywords   │       │  & Workflows  │   │ & Utilities   │
 └───────────────┘   └───────────────┘       └───────────────┘       └───────────────┘   └───────────────┘
```

---

## 🏗️ 2. Core Architectural Principles

DailyDesk follows **Clean Domain-Driven Architecture**, strict **Separation of Concerns**, and **Next.js App Router Best Practices**.

### Key Rules:

1. **Decoupled Business Logic (`src/core/`)**: All mathematical formulas, calculation engines, state reducers, algorithms, and storage adapters are written in pure TypeScript with **zero React/DOM dependencies**. They can be unit-tested independently and reused across web, mobile, or backend microservices.
2. **SSR-Safe Hydration**: Any client-side state or storage interactions must use browser-guard checks (`typeof window !== 'undefined'`) to prevent Next.js server-side rendering (SSR) hydration errors.
3. **Optimized Client Scoping**: Server Components are used for layout hierarchy, metadata, static wrappers, and SEO structure. `'use client'` is strictly limited to interactive component boundaries.
4. **Performance-First Render Loop**: High-frequency interactive updates (e.g., Falling Words 60fps animations) use browser `requestAnimationFrame` loops rather than high-frequency React state updates to prevent DOM thrashing.

---

## 📁 3. Directory Structure

```
src/
├── app/                              # Next.js App Router (Pages, Layouts, Metadata)
│   ├── layout.tsx                    # Root Layout (Fonts, Global Theme, Navbar, Footer)
│   ├── page.tsx                      # DailyDesk Central Hub Dashboard
│   ├── race/                         # Typing Race Route
│   │   └── page.tsx
│   └── falling/                      # Falling Words Route
│       └── page.tsx
├── components/                       # UI Component Library
│   ├── ui/                           # Base UI Primitives (Button, Card, Badge, Modal, ProgressBar)
│   ├── common/                       # Layout Shared Components (Navbar, StatCard)
│   ├── race/                         # Typing Race UI Components (RaceTrack, TextPromptDisplay, RaceHeader, RaceResultsModal)
│   └── falling/                      # Falling Words UI Components (FallingStage, FallingHeader, InputBufferDisplay, FallingResultsModal)
├── core/                             # Pure Domain & Engine Logic (0 React/DOM Dependencies)
│   ├── engine/                       # Math & Metric Engines (WPM, Accuracy, Errors, Performance Feedback)
│   ├── difficulty/                   # Difficulty Algorithms (Race Passages, Adaptive DDA)
│   └── storage/                      # SSR-Safe Local Storage Abstraction Layer
├── hooks/                            # Custom React Hooks (Bridge between Core Logic & React UI)
│   ├── useTypingRace.ts              # Typing Race State Reducer & Keyboard Listener Hook
│   ├── useFallingWords.ts            # Falling Words 60fps Animation & Spawner Loop Hook
│   └── useGameStats.ts               # Local Statistics & Personal Best Sync Hook
└── types/                            # Strict TypeScript Interfaces & Type Declarations
    ├── game.ts                       # Shared Game & Metric Interfaces
    ├── race.ts                       # Typing Race Reducer Actions & State
    └── falling.ts                    # Falling Words Stage & DDA Interfaces
```

---

## 📋 4. Current Modules (Phase 1)

### Module A: Typing Race (`/race`)

- **Objective**: Improve touch-typing speed and accuracy across variable text complexity.
- **Engine**: Calculates Gross WPM, Net WPM, Accuracy %, and Uncorrected Error counts in real time.
- **Difficulty Matrix**:
  - **Easy**: Lowercase short sentences & top common vocabulary.
  - **Medium**: Standard sentences with capitalization and punctuation.
  - **Hard**: Technical syntax, code snippets, numbers (`0-9`), and full punctuation (`!`, `?`, `;`, quotes).
- **UI Components**: `TextPromptDisplay` (character color-coding + caret animation), `RaceTrack` (visual progress marker), `RaceResultsModal` (personal record comparisons & weakness tips).

### Module B: Falling Words (`/falling`)

- **Objective**: Develop quick reflexes and word-level typing speed.
- **Engine**: 60fps physics loop powered by `requestAnimationFrame` + Adaptive Dynamic Difficulty Adjustment (DDA).
- **DDA Algorithm**: Evaluates windowed performance. If accuracy is high ($>95\%$) and words are cleared quickly, adaptive level increments ($1 \rightarrow 10$), increasing drop speed and word length. If lives are lost or accuracy drops ($<80\%$), level decrements safely.
- **UI Components**: `FallingStage` (60fps falling word arena), `InputBufferDisplay` (active typed buffer indicator), `FallingHeader` (lives heart bar, adaptive level badge, score), `FallingResultsModal` (game over summary).

---

## 🚀 5. Extension Roadmap & Future Ecosystem Modules

DailyDesk is built to accommodate future modules without breaking or rewriting existing code:

### 1. Career Tools Suite (`/resume`, `/ats`)

- **Resume Builder**: Modular drag-and-drop resume builder exporting clean PDF/JSON resumes.
- **ATS Resume Analyzer**: Keyword density scoring, formatting checks, and job description match analyzer.

### 2. AI Productivity Suite (`/ai-suite`)

- **AI Draft & Summarizer**: Quick text rephrasing, tone adjustment, and documentation summarizer powered by LLM APIs.
- **Prompt Playground**: Library of curated prompts for software engineers and creators.

### 3. Developer & Daily Office Utilities (`/tools`)

- **Text Formatting & Converter**: JSON formatter, Diff checker, Regex builder, Base64 encoder.
- **Focus & Time Management**: Customizable Pomodoro timer and task checklist integrated into the DailyDesk Hub.

### 4. Global Cloud Sync & Leaderboards (`/leaderboard`)

- **Authentication**: NextAuth / Supabase / Clerk authentication.
- **Global Leaderboards**: Competitive public typing rankings, global high scores, and persistent user profiles.

---

## 🛠️ 6. Guidelines for Contributors & AI Agents

When adding new tools or modifying existing logic:

1. **Never put business math or heavy state logic inside React components**. Create a dedicated pure TypeScript module in `src/core/`.
2. **Create custom hooks in `src/hooks/`** to bridge pure TS engines with React state.
3. **Ensure strict TypeScript typing**. Avoid `any` types or untyped props.
4. **Follow the design system**: Use Tailwind tokens defined in `tailwind.config.ts` and `globals.css` (HSL colors, dark cyberpunk/productivity theme).
5. **Keep local storage SSR-safe**: Use `LocalStorageAdapter` or verify `typeof window !== 'undefined'`.
