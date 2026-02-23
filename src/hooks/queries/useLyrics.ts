import { useQuery } from '@tanstack/react-query';
import { lyricsRepository } from '@/services';

/** Fetch lyrics for a single song. */
export const useLyrics = (songId: string) =>
  useQuery({
    queryKey: ['lyrics', songId],
    queryFn: () => lyricsRepository.getLyrics(songId),
    enabled: !!songId,
  });
