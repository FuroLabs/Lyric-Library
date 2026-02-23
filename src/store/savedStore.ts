import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SavedLyric } from '@/types';
import { mmkvStorage } from './mmkvStorage';

interface SavedStore {
  /** Saved lyrics keyed by song ID for O(1) lookups. */
  savedMap: Record<string, SavedLyric>;

  /** Ordered list of song IDs (newest first). */
  savedOrder: string[];

  /* ── Actions ─────────────────────────────────────────────────── */
  saveLyric: (entry: SavedLyric) => void;
  removeLyric: (songId: string) => void;
  isSaved: (songId: string) => boolean;
  getSavedList: () => SavedLyric[];
  clearAll: () => void;

  /** Hydration state (true once storage rehydrated). */
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedMap: {},
      savedOrder: [],

      saveLyric: (entry) =>
        set((state) => ({
          savedMap: { ...state.savedMap, [entry.songId]: entry },
          savedOrder: [
            entry.songId,
            ...state.savedOrder.filter((id) => id !== entry.songId),
          ],
        })),

      removeLyric: (songId) =>
        set((state) => {
          const rest = { ...state.savedMap };
          delete rest[songId];
          return {
            savedMap: rest,
            savedOrder: state.savedOrder.filter((id) => id !== songId),
          };
        }),

      isSaved: (songId) => songId in get().savedMap,

      getSavedList: () => {
        const { savedMap, savedOrder } = get();
        return savedOrder
          .map((id) => savedMap[id])
          .filter(Boolean) as SavedLyric[];
      },

      clearAll: () => set({ savedMap: {}, savedOrder: [] }),

      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'lyric-library-saved',
      storage: createJSONStorage(() => mmkvStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
