import { useQuery } from '@tanstack/react-query';
import { lyricsRepository } from '@/services';

/** Feature-scoped hook to fetch lyrics for a song. */
export const useLyrics = (songId: string) =>
  useQuery({
    queryKey: ['feature:lyrics', songId],
    queryFn: () => lyricsRepository.getLyrics(songId),
    enabled: !!songId,
  });

export default useLyrics;
