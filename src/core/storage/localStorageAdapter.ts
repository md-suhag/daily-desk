import { GameResultHistory, LocalStatsRecord } from '@/types/game';

const STORAGE_KEY = 'typing_platform_user_stats_v1';

const DEFAULT_STATS: LocalStatsRecord = {
  bestRaceWPM: 0,
  bestRaceAccuracy: 0,
  bestFallingScore: 0,
  bestFallingWPM: 0,
  history: [],
};

export class LocalStorageAdapter {
  private static isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  public static getStats(): LocalStatsRecord {
    if (!this.isAvailable()) return DEFAULT_STATS;

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_STATS;
      const parsed = JSON.parse(data) as LocalStatsRecord;
      return {
        ...DEFAULT_STATS,
        ...parsed,
        history: parsed.history || [],
      };
    } catch (e) {
      console.warn('Failed to parse stats from localStorage', e);
      return DEFAULT_STATS;
    }
  }

  public static saveResult(result: GameResultHistory): { updatedStats: LocalStatsRecord; isNewBest: boolean } {
    const currentStats = this.getStats();
    let isNewBest = false;

    let newBestRaceWPM = currentStats.bestRaceWPM;
    let newBestRaceAccuracy = currentStats.bestRaceAccuracy;
    let newBestFallingScore = currentStats.bestFallingScore;
    let newBestFallingWPM = currentStats.bestFallingWPM;

    if (result.gameType === 'RACE') {
      if (result.wpm > currentStats.bestRaceWPM) {
        newBestRaceWPM = result.wpm;
        newBestRaceAccuracy = result.accuracy;
        isNewBest = true;
      }
    } else if (result.gameType === 'FALLING') {
      if ((result.score || 0) > currentStats.bestFallingScore) {
        newBestFallingScore = result.score || 0;
        isNewBest = true;
      }
      if (result.wpm > currentStats.bestFallingWPM) {
        newBestFallingWPM = result.wpm;
      }
    }

    // Retain maximum of 30 recent history entries
    const updatedHistory = [result, ...currentStats.history].slice(0, 30);

    const updatedStats: LocalStatsRecord = {
      bestRaceWPM: newBestRaceWPM,
      bestRaceAccuracy: newBestRaceAccuracy,
      bestFallingScore: newBestFallingScore,
      bestFallingWPM: newBestFallingWPM,
      history: updatedHistory,
    };

    if (this.isAvailable()) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
      } catch (e) {
        console.warn('Failed to save result to localStorage', e);
      }
    }

    return { updatedStats, isNewBest };
  }

  public static clearStats(): LocalStatsRecord {
    if (this.isAvailable()) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('Failed to clear localStorage', e);
      }
    }
    return DEFAULT_STATS;
  }
}
