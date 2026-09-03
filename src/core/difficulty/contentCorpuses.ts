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
      source: 'Classic Pangram',
      text: 'the quick brown fox jumps over the lazy dog and runs through the quiet green forest without making a single sound.',
    },
    {
      id: 'easy-2',
      difficulty: 'EASY',
      source: 'Daily Habit',
      text: 'typing every day helps build muscle memory and speeds up how fast you can share your creative thoughts with the world.',
    },
    {
      id: 'easy-3',
      difficulty: 'EASY',
      source: 'Focus & Relaxation',
      text: 'keep your hands relaxed on the keyboard and press each key smoothly without rushing your fingers or tensing your shoulders.',
    },
    {
      id: 'easy-4',
      difficulty: 'EASY',
      source: 'Office Communication',
      text: 'clear communication in daily emails and messages helps team members collaborate smoothly and finish tasks on time.',
    },
    {
      id: 'easy-5',
      difficulty: 'EASY',
      source: 'Pangram Drill 2',
      text: 'pack my box with five dozen liquor jugs while we play our favorite games near the bright warm sunshine.',
    },
    {
      id: 'easy-6',
      difficulty: 'EASY',
      source: 'Rhythm & Accuracy',
      text: 'speed comes naturally when you focus on hitting the correct keys with consistent rhythm and accurate finger placement.',
    },
    {
      id: 'easy-7',
      difficulty: 'EASY',
      source: 'Personal Growth',
      text: 'small daily improvements over time lead to massive long term success in learning new skills and achieving goals.',
    },
    {
      id: 'easy-8',
      difficulty: 'EASY',
      source: 'Keyboard Mastery',
      text: 'learning the home row position allows you to type effortlessly without looking down at the keyboard keys.',
    },
    {
      id: 'easy-9',
      difficulty: 'EASY',
      source: 'Creative Writing',
      text: 'when your typing speed increases your thoughts flow directly onto the screen without any hesitation or mental friction.',
    },
    {
      id: 'easy-10',
      difficulty: 'EASY',
      source: 'Daily Positivity',
      text: 'a positive mindset and steady effort make difficult challenges feel manageable and rewarding every single day.',
    },
  ],
  MEDIUM: [
    {
      id: 'med-1',
      difficulty: 'MEDIUM',
      source: 'Life Wisdom',
      text: 'Success is not final, failure is not fatal: it is the courage to continue that counts in the long journey of life.',
    },
    {
      id: 'med-2',
      difficulty: 'MEDIUM',
      source: 'Steve Jobs Quote',
      text: 'The only way to do great work is to love what you do. If you have not found it yet, keep looking and do not settle.',
    },
    {
      id: 'med-3',
      difficulty: 'MEDIUM',
      source: 'Albert Einstein Quote',
      text: 'Strive not to be a success, but rather to be of value. Curiosity has its own reason for existing in our wonderful universe.',
    },
    {
      id: 'med-4',
      difficulty: 'MEDIUM',
      source: 'Productivity Philosophy',
      text: 'Consistency beats intensity when building any mechanical skill. Practice twenty minutes daily for steady and lasting progress.',
    },
    {
      id: 'med-5',
      difficulty: 'MEDIUM',
      source: 'Professional Email',
      text: 'Thank you for reviewing the project proposal. Please let me know your thoughts so we can finalize the schedule for next week.',
    },
    {
      id: 'med-6',
      difficulty: 'MEDIUM',
      source: 'Nature & Science',
      text: 'Oceans cover more than seventy percent of Earth\'s surface, regulating global climate patterns and supporting diverse ecosystems.',
    },
    {
      id: 'med-7',
      difficulty: 'MEDIUM',
      source: 'Digital Age',
      text: 'Mastering touch typing transforms the keyboard from a slow bottleneck into a fast, seamless extension of your active mind.',
    },
    {
      id: 'med-8',
      difficulty: 'MEDIUM',
      source: 'Literature Excerpt',
      text: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the epoch of belief and hope.',
    },
    {
      id: 'med-9',
      difficulty: 'MEDIUM',
      source: 'Time Management',
      text: 'Organizing your daily schedule in advance reduces decision fatigue, giving you clarity and energy to focus on what matters most.',
    },
    {
      id: 'med-10',
      difficulty: 'MEDIUM',
      source: 'Healthy Habits',
      text: 'Drinking enough water, taking short eye breaks, and maintaining upright posture make long typing sessions comfortable and healthy.',
    },
  ],
  HARD: [
    {
      id: 'hard-1',
      difficulty: 'HARD',
      source: 'Shakespeare Excerpt',
      text: '"Shall I compare thee to a summer\'s day? Thou art more lovely and more temperate: rough winds do shake the darling buds of May!"',
    },
    {
      id: 'hard-2',
      difficulty: 'HARD',
      source: 'Business Report & Data',
      text: 'In Q3 2026, global revenue rose by 14.8% ($2.4B net profit); operating margins expanded to 28.5% across 45 international markets!',
    },
    {
      id: 'hard-3',
      difficulty: 'HARD',
      source: 'Scientific Discovery',
      text: 'The James Webb Space Telescope detected water vapor (H2O) and carbon dioxide (CO2) in Exoplanet WASP-96b\'s atmosphere at 1,150 light-years.',
    },
    {
      id: 'hard-4',
      difficulty: 'HARD',
      source: 'Office & Finance Typing',
      text: 'Invoice #8492-B: Total payable amount is $3,450.75 USD (VAT @ 15.0% included). Please transfer funds by 12/09/2026 via wire transfer.',
    },
    {
      id: 'hard-5',
      difficulty: 'HARD',
      source: 'Punctuation & Symbols Drill',
      text: 'Wait! Have you checked all requirements (e.g., date, time, price & contact info)? If so, email us at support@dailydesk.app right away!',
    },
    {
      id: 'hard-6',
      difficulty: 'HARD',
      source: 'Tech & Digital World',
      text: 'Artificial intelligence and cloud computing process petabytes of data per second [p99 latency <= 25ms], reshaping modern global industries.',
    },
    {
      id: 'hard-7',
      difficulty: 'HARD',
      source: 'Historical Speeches',
      text: '"I have a dream that one day this nation will rise up and live out the true meaning of its creed: We hold these truths to be self-evident!"',
    },
    {
      id: 'hard-8',
      difficulty: 'HARD',
      source: 'General Computer Shortcuts',
      text: 'Keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z & Alt+Tab) save over 64 hours per year compared to clicking mouse menus repeatedly.',
    },
    {
      id: 'hard-9',
      difficulty: 'HARD',
      source: 'Code & Syntax Optional Drill',
      text: 'function calculateSpeed(words: number, minutes: number): number { return Math.round(words / minutes); } // Simple 5-char telemetry',
    },
    {
      id: 'hard-10',
      difficulty: 'HARD',
      source: 'Advanced Grammar & Numbers',
      text: 'According to survey data (2025-2026), 92.4% of professionals who type 70+ WPM report 35% higher productivity in daily email tasks.',
    },
  ],
};

export const FALLING_WORD_BANKS: Record<DifficultyLevel, string[]> = {
  EASY: [
    // Top 3-4 Letter Daily English Words for General People & All Typing Practice
    'the', 'and', 'that', 'have', 'with', 'this', 'from', 'they', 'will', 'would', 
    'there', 'their', 'what', 'about', 'which', 'when', 'make', 'like', 'time', 'just', 
    'know', 'take', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'other', 
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 
    'even', 'new', 'want', 'any', 'these', 'give', 'day', 'most', 'us', 'life',
    'book', 'read', 'word', 'mind', 'plan', 'task', 'mail', 'city', 'home', 'desk',
    'fast', 'type', 'key', 'view', 'page', 'time', 'score', 'race', 'easy', 'play'
  ],
  MEDIUM: [
    // 5-7 Letter Common Everyday Words, Office Terms & Practice Vocabulary
    'people', 'before', 'should', 'through', 'between', 'change', 'number', 'system', 
    'public', 'person', 'during', 'create', 'another', 'world', 'family', 'course', 
    'company', 'program', 'problem', 'service', 'group', 'country', 'point', 'school', 
    'place', 'think', 'where', 'after', 'right', 'order', 'great', 'small', 'table', 
    'market', 'custom', 'status', 'border', 'padding', 'margin', 'shadow', 'hover', 
    'action', 'header', 'active', 'script', 'future', 'memory', 'client', 'server', 
    'filter', 'result', 'metric', 'target', 'speed', 'rhythm', 'visual', 'streak',
    'email', 'office', 'report', 'letter', 'search', 'design', 'update', 'share'
  ],
  HARD: [
    // 8+ Letter Advanced Everyday Vocabulary, Business, Science & Practice Words
    'performance', 'responsive', 'animation', 'navigation', 'interface', 'definition', 
    'properties', 'production', 'accessible', 'development', 'experience', 'consistency', 
    'management', 'flexibility', 'technology', 'opportunity', 'understanding', 'environment', 
    'information', 'relationship', 'organization', 'description', 'application', 'communication', 
    'responsibility', 'productivity', 'efficiency', 'functionality', 'implementation', 
    'infrastructure', 'configuration', 'standardization', 'compatibility', 'celebration',
    'independence', 'transformation', 'collaboration', 'curiosity', 'determination'
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
