/**
 * Falling Words Dynamic Difficulty Adjustment (DDA) Engine
 * Adjusts drop speeds, word spawn intervals, and word length scale smoothly based on performance.
 */

export interface DifficultyConfig {
  spawnIntervalMs: number; // Interval between spawning new falling words
  baseSpeed: number;        // Drop speed percentage per second (e.g. 5% to 20% of screen height per sec)
  maxActiveWords: number;   // Maximum concurrent falling words allowed on stage
}

export function getDifficultyConfigForLevel(adaptiveLevel: number): DifficultyConfig {
  const clampedLevel = Math.max(1, Math.min(10, adaptiveLevel));
  
  // Level 1: 3000ms spawn, 4% speed/sec, max 3 words
  // Level 10: 1200ms spawn, 14% speed/sec, max 7 words
  const spawnIntervalMs = Math.max(1200, 3200 - clampedLevel * 200);
  const baseSpeed = 4.0 + clampedLevel * 1.0;
  const maxActiveWords = Math.min(8, 3 + Math.floor(clampedLevel / 2));

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
