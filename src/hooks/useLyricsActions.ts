import { useState } from 'react';
import { Share } from 'react-native';
import { useSavedStore } from '@/store/savedStore';
import type { SavedLyric, LyricsTextSize, Lyrics, LyricsSection } from '@/types/models';

const TEXT_SIZE_ORDER: LyricsTextSize[] = ['normal', 'large', 'small'];

export function useLyricsActions(songId: string, songTitle: string, artistName: string) {
  const [textSize, setTextSize] = useState<LyricsTextSize>('normal');

  const isSaved = useSavedStore((s) => s.isSaved(songId));
  const saveLyric = useSavedStore((s) => s.saveLyric);
  const removeLyric = useSavedStore((s) => s.removeLyric);

  const handleToggleSave = (lyrics: Lyrics | null | undefined) => {
    if (!lyrics) return;

    if (isSaved) {
      removeLyric(songId);
      return;
    }

    const previewText =
      lyrics.sections?.[0]?.lines?.slice(0, 2).join(' ') ?? songTitle;

    const entry: SavedLyric = {
      lyricId: `lyric-${songId}`,
      songId,
      songTitle: lyrics.songTitle ?? songTitle,
      artistName: lyrics.artistName ?? artistName,
      previewText,
      savedAt: Date.now(),
      viewCount: 1,
    };

    saveLyric(entry);
  };

  const handleShare = async (lyrics: Lyrics | null | undefined) => {
    if (!lyrics) return;

    const text = [
      `${lyrics.songTitle} — ${lyrics.artistName}`,
      '',
      ...lyrics.sections.flatMap((s: LyricsSection) => [s.label, ...s.lines, '']),
    ].join('\n');

    try {
      await Share.share({
        message: text,
        title: lyrics.songTitle,
      });
    } catch (e) {
      // no-op
    }
  };

  const handleCycleTextSize = () => {
    const idx = TEXT_SIZE_ORDER.indexOf(textSize);
    const next = TEXT_SIZE_ORDER[(idx + 1) % TEXT_SIZE_ORDER.length];
    setTextSize(next);
  };

  return {
    textSize,
    isSaved,
    handleToggleSave,
    handleShare,
    handleCycleTextSize,
  };
}