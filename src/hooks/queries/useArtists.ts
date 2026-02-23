import { useQuery } from '@tanstack/react-query';
import { lyricsRepository } from '@/services';

/** Fetch all artists. */
export const useArtists = () =>
  useQuery({
    queryKey: ['artists'],
    queryFn: () => lyricsRepository.getArtists(),
  });

/** Fetch a single artist by ID. */
export const useArtistById = (artistId: string) =>
  useQuery({
    queryKey: ['artists', artistId],
    queryFn: () => lyricsRepository.getArtistById(artistId),
    enabled: !!artistId,
  });
