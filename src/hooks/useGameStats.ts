'use client';

import { useEffect, useState } from 'react';
import { GameResultHistory, LocalStatsRecord } from '@/types/game';
import { LocalStorageAdapter } from '@/core/storage/localStorageAdapter';

export function useGameStats() {
  const [stats, setStats] = useState<LocalStatsRecord>({
    bestRaceWPM: 0,
    bestRaceAccuracy: 0,
    bestFallingScore: 0,
    bestFallingWPM: 0,
    history: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = LocalStorageAdapter.getStats();
    setStats(loaded);
    setIsLoaded(true);
  }, []);

  const recordResult = (result: GameResultHistory) => {
    const { updatedStats, isNewBest } = LocalStorageAdapter.saveResult(result);
    setStats(updatedStats);
    return isNewBest;
  };

  const clearAllStats = () => {
    const cleared = LocalStorageAdapter.clearStats();
    setStats(cleared);
  };

  return {
    stats,
    isLoaded,
    recordResult,
    clearAllStats,
  };
}
