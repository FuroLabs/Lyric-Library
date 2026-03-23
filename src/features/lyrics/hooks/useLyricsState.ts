import { useSavedStore } from '@/store';
import { buildSavedLyric } from '../utils/builders';

export function useLyricsState(songId: string) {
  const isSaved = useSavedStore((state) => state.isSaved(songId));
  const saveLyric = useSavedStore((state) => state.saveLyric);
  const removeLyric = useSavedStore((state) => state.removeLyric);

  const toggleSave = (
    lyrics: { songTitle: string; artistName: string; previewText?: string },
    previewText?: string,
  ) => {
    if (!lyrics) {
      return;
    }

    if (isSaved) {
      removeLyric(songId);
      return;
    }

    const preview = previewText ?? lyrics.previewText ?? '';
    saveLyric(buildSavedLyric(songId, lyrics.songTitle, lyrics.artistName, preview));
  };

  return {
    isSaved,
    toggleSave,
  };
}
