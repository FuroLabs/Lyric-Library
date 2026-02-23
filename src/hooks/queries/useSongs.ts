import { useQuery } from '@tanstack/react-query';
import { lyricsRepository } from '@/services';
import type { SongSortMode } from '@/types';

/** Fetch all songs with optional sort. */
export const useSongs = (sort: SongSortMode = 'title') =>
  useQuery({
    queryKey: ['songs', sort],
    queryFn: () => lyricsRepository.getSongs(sort),
  });

/** Fetch songs for a specific artist. */
export const useSongsByArtist = (artistId: string) =>
  useQuery({
    queryKey: ['songs', 'artist', artistId],
    queryFn: () => lyricsRepository.getSongsByArtist(artistId),
    enabled: !!artistId,
  });
