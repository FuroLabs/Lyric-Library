import { useQuery } from '@tanstack/react-query';
import { lyricsRepository } from '@/services';

/**
 * Search artists, songs, and lyrics.
 * Automatically disabled when query is empty.
 */
export const useSearch = (query: string) =>
  useQuery({
    queryKey: ['search', query],
    queryFn: () => lyricsRepository.search(query),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60, // 1 min
  });
