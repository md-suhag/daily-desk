/**
 * Falling Words Dynamic Difficulty Adjustment (DDA) Engine
 * Adjusts drop speeds, word spawn intervals, and word length scale smoothly based on performance.
 */

export interface DifficultyConfig {
  spawnIntervalMs: number; // Interval between spawning new falling words
  baseSpeed: number;        // Drop speed percentage per second (e.g. 14% to 35% of screen height per sec)
  maxActiveWords: number;   // Maximum concurrent falling words allowed on stage
}

export function getDifficultyConfigForLevel(adaptiveLevel: number): DifficultyConfig {
  const clampedLevel = Math.max(1, Math.min(10, adaptiveLevel));
  
  // Level 1: 2800ms spawn interval, 14% drop speed/sec (~6.5s to reach bottom), max 3 words
  // Level 10: 1200ms spawn interval, 32% drop speed/sec (~2.8s to reach bottom), max 7 words
  const spawnIntervalMs = Math.max(1100, 2800 - clampedLevel * 170);
  const baseSpeed = 12.0 + clampedLevel * 2.0;
  const maxActiveWords = Math.min(7, 2 + Math.floor(clampedLevel / 2));

  return {
    spawnIntervalMs,
    baseSpeed,
    maxActiveWords,
  };
}

/**
 * Calculates adaptive level delta based on recent words performance window
 */
export function calculateNextAdaptiveLevel(
  currentLevel: number,
  recentCleared: number,
  recentMissed: number,
  recentAccuracy: number
): number {
  let newLevel = currentLevel;

  // If player lost a life or missed multiple words -> reduce difficulty
  if (recentMissed > 0 || recentAccuracy < 80) {
    newLevel = Math.max(1, currentLevel - 1);
  } 
  // If player cleared 4+ words consecutively with high accuracy -> increase difficulty
  else if (recentCleared >= 4 && recentAccuracy >= 95) {
    newLevel = Math.min(10, currentLevel + 1);
  }

  return newLevel;
}
