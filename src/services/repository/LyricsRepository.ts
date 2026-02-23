import { Artist, Song, Lyrics, SearchResult, SongSortMode } from '@/types';

/**
 * Abstract repository interface for the Lyric Library data layer.
 * Sprint 1 uses MockLyricsRepository; Sprint 3 can swap in an API-backed one.
 */
export interface LyricsRepository {
  /* ── Artists ─────────────────────────────────────────────────── */
  getArtists(): Promise<Artist[]>;
  getArtistById(id: string): Promise<Artist | undefined>;

  /* ── Songs ──────────────────────────────────────────────────── */
  getSongs(sort?: SongSortMode): Promise<Song[]>;
  getSongsByArtist(artistId: string): Promise<Song[]>;
  getSongById(id: string): Promise<Song | undefined>;

  /* ── Lyrics ─────────────────────────────────────────────────── */
  getLyrics(songId: string): Promise<Lyrics | undefined>;

  /* ── Search ─────────────────────────────────────────────────── */
  search(query: string): Promise<SearchResult[]>;
}
