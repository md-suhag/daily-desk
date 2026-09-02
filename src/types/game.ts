export type GameStatus = 'IDLE' | 'COUNTDOWN' | 'PLAYING' | 'PAUSED' | 'COMPLETED' | 'GAME_OVER';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface RawMetrics {
  totalCharsTyped: number;
  correctCharsTyped: number;
  incorrectCharsTyped: number;
  uncorrectedErrors: number;
  startTime: number | null;
  endTime: number | null;
}

export interface CalculatedMetrics {
  grossWPM: number;
  netWPM: number;
  accuracy: number; // 0 to 100 percentage
  durationSeconds: number;
}

export interface GameResultHistory {
  id: string;
  gameType: 'RACE' | 'FALLING';
  timestamp: number;
  wpm: number;
  accuracy: number;
  difficulty: DifficultyLevel;
  metrics: RawMetrics;
  score?: number;
  wordsCleared?: number;
}

export interface LocalStatsRecord {
  bestRaceWPM: number;
  bestRaceAccuracy: number;
  bestFallingScore: number;
  bestFallingWPM: number;
  history: GameResultHistory[];
}

export interface PerformanceFeedback {
  wpm: number;
  wpmDelta: number; // difference from previous or best
  accuracy: number;
  accuracyDelta: number;
  isNewBestWPM: boolean;
  weakAreas: string[];
  summaryMessage: string;
}
