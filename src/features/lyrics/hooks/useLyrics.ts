import { useQuery } from '@tanstack/react-query';
import { lyricsRepository } from '@/services';
import type { LyricsDetailViewModel, LyricsSectionViewModel } from '../types';

function toSectionViewModel(songId: string, index: number, label: string, type: LyricsSectionViewModel['type'], lines: string[]): LyricsSectionViewModel {
  return {
    id: `${songId}-${type}-${index}`,
    type,
    label,
    lines,
    isHighlight: type === 'chorus',
  };
}

async function fetchLyricsBySongId(songId: string): Promise<LyricsDetailViewModel> {
  const lyrics = await lyricsRepository.getLyrics(songId);

  if (!lyrics) {
    throw new Error(`Lyrics for song "${songId}" were not found`);
  }

  const sections = lyrics.sections
    .map((section, index) => {
      const lines = section.lines.map((line) => line.trim()).filter(Boolean);

      return toSectionViewModel(songId, index, section.label, section.type, lines);
    })
    .filter((section) => section.lines.length > 0);

  const previewText =
    sections.flatMap((section) => section.lines).find(Boolean) ?? `Saved lyrics from ${lyrics.songTitle}`;

  return {
    songId: lyrics.songId,
    songTitle: lyrics.songTitle,
    artistName: lyrics.artistName,
    albumTitle: lyrics.albumTitle,
    sections,
    previewText,
  };
}

export function useLyrics(songId: string) {
  return useQuery<LyricsDetailViewModel, Error>({
    queryKey: ['lyrics-detail', songId],
    queryFn: () => fetchLyricsBySongId(songId),
    enabled: !!songId,
    staleTime: 5 * 60 * 1000,
  });
}