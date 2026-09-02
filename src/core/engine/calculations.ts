import { CalculatedMetrics, GameResultHistory, LocalStatsRecord, PerformanceFeedback, RawMetrics } from '@/types/game';

/**
 * Standard WPM Calculation
 * Gross WPM = (Total Characters Typed / 5) / (Time in Minutes)
 * Net WPM = ((Total Characters Typed - Uncorrected Errors) / 5) / (Time in Minutes)
 */
export function calculateWPM(
  totalCharsTyped: number,
  uncorrectedErrors: number,
  durationSeconds: number
): { grossWPM: number; netWPM: number } {
  if (durationSeconds <= 0.5 || totalCharsTyped <= 0) {
    return { grossWPM: 0, netWPM: 0 };
  }

  const durationMinutes = durationSeconds / 60;
  const grossWPM = Math.round((totalCharsTyped / 5) / durationMinutes);
  const netWPM = Math.max(0, Math.round(((totalCharsTyped - uncorrectedErrors) / 5) / durationMinutes));

  return { grossWPM, netWPM };
}

/**
 * Calculates typing accuracy percentage (0.0% to 100.0%)
 */
export function calculateAccuracy(correctCharsTyped: number, totalCharsTyped: number): number {
  if (totalCharsTyped <= 0) return 100;
  const accuracy = (correctCharsTyped / totalCharsTyped) * 100;
  return Math.min(100, Math.max(0, Math.round(accuracy * 10) / 10));
}

/**
 * Format elapsed seconds into mm:ss standard string format
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Generates insightful feedback comparing recent performance against personal best / average history
 */
export function generatePerformanceFeedback(
  currentResult: GameResultHistory,
  stats: LocalStatsRecord
): PerformanceFeedback {
  const isRace = currentResult.gameType === 'RACE';
  const previousBestWPM = isRace ? stats.bestRaceWPM : stats.bestFallingWPM;
  
  // Calculate WPM delta
  const wpmDelta = currentResult.wpm - previousBestWPM;
  const isNewBestWPM = currentResult.wpm > previousBestWPM && previousBestWPM > 0;

  // Filter previous results of same game type
  const sameGameHistory = stats.history.filter((h) => h.gameType === currentResult.gameType);
  const previousResult = sameGameHistory.length > 0 ? sameGameHistory[0] : null;

  const previousAccuracy = previousResult ? previousResult.accuracy : currentResult.accuracy;
  const accuracyDelta = Math.round((currentResult.accuracy - previousAccuracy) * 10) / 10;

  // Identify weak areas
  const weakAreas: string[] = [];
  if (currentResult.accuracy < 90) {
    weakAreas.push('Focus on accuracy over raw speed. Slow down slightly on complex transitions.');
  }
  if (currentResult.metrics.uncorrectedErrors > 3) {
    weakAreas.push('Multiple uncorrected errors impacted your Net WPM significantly.');
  }
  if (currentResult.wpm < 30 && currentResult.accuracy >= 95) {
    weakAreas.push('Great precision! Gradually push your rhythm to build finger agility.');
  }

  // Summary message logic
  let summaryMessage = 'Solid typing session! Keep building consistency.';
  if (isNewBestWPM) {
    summaryMessage = `🏆 New Personal Best! You reached ${currentResult.wpm} WPM!`;
  } else if (wpmDelta >= -2 && wpmDelta < 0) {
    summaryMessage = 'Extremely close to your personal best! Maintain your rhythm.';
  } else if (currentResult.accuracy >= 98) {
    summaryMessage = '🎯 Phenomenal accuracy! Precision is the foundation of high-speed typing.';
  }

  return {
    wpm: currentResult.wpm,
    wpmDelta,
    accuracy: currentResult.accuracy,
    accuracyDelta,
    isNewBestWPM,
    weakAreas,
    summaryMessage,
  };
}
