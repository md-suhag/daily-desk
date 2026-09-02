import { CalculatedMetrics, DifficultyLevel, GameStatus, RawMetrics } from './game';

export type CharacterStatus = 'UNTOUCHED' | 'CORRECT' | 'INCORRECT' | 'EXTRA';

export interface CharacterItem {
  char: string;
  status: CharacterStatus;
}

export interface RaceState {
  status: GameStatus;
  difficulty: DifficultyLevel;
  targetText: string;
  typedInput: string;
  cursorIndex: number;
  countdownSeconds: number;
  rawMetrics: RawMetrics;
  calculatedMetrics: CalculatedMetrics;
  errorIndices: number[]; // Set of indices where an error occurred
}

export type RaceAction =
  | { type: 'SET_DIFFICULTY'; payload: DifficultyLevel }
  | { type: 'START_COUNTDOWN' }
  | { type: 'TICK_COUNTDOWN' }
  | { type: 'START_GAME' }
  | { type: 'TYPE_CHAR'; payload: { char: string; timestamp: number } }
  | { type: 'BACKSPACE' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART' }
  | { type: 'TICK_TIME'; payload: number }
  | { type: 'LOAD_TEXT'; payload: string };
