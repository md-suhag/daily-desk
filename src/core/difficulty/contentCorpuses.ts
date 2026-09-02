import { DifficultyLevel } from '@/types/game';

export interface RacePassage {
  id: string;
  text: string;
  difficulty: DifficultyLevel;
  source: string;
}

export const RACE_CORPUSES: Record<DifficultyLevel, RacePassage[]> = {
  EASY: [
    {
      id: 'easy-1',
      difficulty: 'EASY',
      source: 'Common Practice',
      text: 'the quick brown fox jumps over the lazy dog and runs through the quiet green forest without making a single sound.',
    },
    {
      id: 'easy-2',
      difficulty: 'EASY',
      source: 'Daily Routine',
      text: 'typing every day helps build muscle memory and speeds up how fast you can share your creative ideas with the world.',
    },
    {
      id: 'easy-3',
      difficulty: 'EASY',
      source: 'Focus Mantra',
      text: 'keep your hands relaxed on the keyboard and press each key smoothly without rushing your fingers.',
    },
    {
      id: 'easy-4',
      difficulty: 'EASY',
      source: 'Clean Code',
      text: 'good code is easy to read easy to test and simple to understand for everyone on your team.',
    },
  ],
  MEDIUM: [
    {
      id: 'med-1',
      difficulty: 'MEDIUM',
      source: 'Tech Insights',
      text: 'Modern web development requires a balance of visual aesthetics, high performance, and accessible user experience.',
    },
    {
      id: 'med-2',
      difficulty: 'MEDIUM',
      source: 'Productivity Philosophy',
      text: 'Consistency beats intensity when learning any complex mechanical skill. Practice twenty minutes daily for optimal progression.',
    },
    {
      id: 'med-3',
      difficulty: 'MEDIUM',
      source: 'Software Craftsmanship',
      text: 'Building scalable user interfaces demands modular components, clean typing interfaces, and intuitive feedback loops.',
    },
    {
      id: 'med-4',
      difficulty: 'MEDIUM',
      source: 'Agile Learning',
      text: 'Mastering touch typing transforms the keyboard from a bottleneck into a seamless extension of your thoughts.',
    },
  ],
  HARD: [
    {
      id: 'hard-1',
      difficulty: 'HARD',
      source: 'System Architecture',
      text: 'Asynchronous event loops execute in non-blocking threads (e.g., Node.js v20.14 & React 18 Concurrent Mode), optimizing I/O throughput by 45%.',
    },
    {
      id: 'hard-2',
      difficulty: 'HARD',
      source: 'Algorithm Complexity',
      text: 'The requestAnimationFrame API operates at 60 FPS (~16.67ms per frame delta); balancing state mutations avoids layout thrashing!',
    },
    {
      id: 'hard-3',
      difficulty: 'HARD',
      source: 'Modern Web Engineering',
      text: 'TypeScript 5.4 introduces strict type narrowing: interface GameState { status: "PLAYING" | "PAUSED"; wpm: number; accuracy: 99.5%; }',
    },
    {
      id: 'hard-4',
      difficulty: 'HARD',
      source: 'Literary Excerpt',
      text: '"Shall I compare thee to a summer\'s day? Thou art more lovely and more temperate: rough winds do shake the darling buds of May!"',
    },
  ],
};

export const FALLING_WORD_BANKS: Record<DifficultyLevel, string[]> = {
  EASY: [
    'code', 'web', 'fast', 'type', 'key', 'loop', 'data', 'react', 'next', 'flow',
    'byte', 'sync', 'task', 'node', 'app', 'grid', 'font', 'dark', 'css', 'hero',
    'flex', 'icon', 'card', 'state', 'hook', 'view', 'page', 'time', 'score', 'race',
  ],
  MEDIUM: [
    'action', 'canvas', 'render', 'signal', 'vector', 'button', 'header', 'system',
    'layout', 'cursor', 'active', 'script', 'export', 'import', 'module', 'router',
    'effect', 'future', 'memory', 'socket', 'stream', 'thread', 'schema', 'branch',
    'commit', 'deploy', 'client', 'server', 'filter', 'reduce',
  ],
  HARD: [
    'async', 'callback', 'middleware', 'typescript', 'algorithm', 'performance',
    'stateful', 'hydration', 'component', 'responsive', 'animation', 'navigation',
    'interface', 'definition', 'properties', 'production', 'accessible', 'refactoring',
    'concurrent', 'evaluation', 'optimization', 'architecture', 'scalability',
  ],
};

export function getRandomPassage(difficulty: DifficultyLevel): RacePassage {
  const list = RACE_CORPUSES[difficulty];
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function getRandomFallingWord(level: number): string {
  let bank: string[];
  if (level <= 3) {
    bank = FALLING_WORD_BANKS.EASY;
  } else if (level <= 7) {
    bank = FALLING_WORD_BANKS.MEDIUM;
  } else {
    bank = FALLING_WORD_BANKS.HARD;
  }
  const index = Math.floor(Math.random() * bank.length);
  return bank[index];
}
