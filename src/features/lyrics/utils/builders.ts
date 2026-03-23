import type { SavedLyric } from '@/types';

export function buildSavedLyric(
  songId: string,
  songTitle: string,
  artistName: string,
  previewText: string,
): SavedLyric {
  return {
    lyricId: songId,
    songId,
    songTitle,
    artistName,
    previewText,
    savedAt: Date.now(),
    viewCount: 0,
  };
}
