import { CalculatedMetrics, DifficultyLevel, GameStatus, RawMetrics } from './game';

export interface FallingWord {
  id: string;
  text: string;
  xPercent: number; // 5% to 85% horizontal alignment
  yPercent: number; // 0% (top) to 100% (bottom reach)
  speed: number;    // falling speed factor
  isTargeted: boolean;
  matchedCharsCount: number;
}

export interface FallingWordsState {
  status: GameStatus;
  difficulty: DifficultyLevel;
  score: number;
  lives: number;
  maxLives: number;
  wordsCleared: number;
  wordsMissed: number;
  activeInput: string;
  adaptiveLevel: number; // 1 to 10 scale
  words: FallingWord[];
  rawMetrics: RawMetrics;
  calculatedMetrics: CalculatedMetrics;
  lastSpawnTime: number;
}

export type FallingAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART' }
  | { type: 'TYPE_CHAR'; payload: string }
  | { type: 'CLEAR_INPUT' }
  | { type: 'SPAWN_WORD'; payload: FallingWord }
  | { type: 'UPDATE_POSITIONS'; payload: { deltaSeconds: number; maxSpeedMultiplier: number } }
  | { type: 'WORD_DESTROYED'; payload: { id: string; wordLength: number } }
  | { type: 'WORD_MISSED'; payload: { id: string } }
  | { type: 'ADJUST_DIFFICULTY'; payload: { newLevel: number } }
  | { type: 'TICK_TIME'; payload: number };
