/**
 * Navigation route types — single source of truth for all navigation params.
 *
 * Usage in screens:
 *   import { ArtistsStackParamList } from '@/app/navigationTypes';
 *   type Props = NativeStackScreenProps<ArtistsStackParamList, 'ArtistDetail'>;
 */
import type { NavigatorScreenParams } from '@react-navigation/native';

// ─── Stack Param Lists ───────────────────────────────────────────

export type ArtistsStackParamList = {
  ArtistsList: undefined;
  ArtistDetail: { artistId: string; artistName: string };
  Lyrics: { songId: string; songTitle: string; artistName: string };
};

export type SongsStackParamList = {
  SongsList: undefined;
  Lyrics: { songId: string; songTitle: string; artistName: string };
};

export type SearchStackParamList = {
  SearchMain: undefined;
  ArtistDetail: { artistId: string; artistName: string };
  Lyrics: { songId: string; songTitle: string; artistName: string };
};

export type SavedStackParamList = {
  SavedList: undefined;
  Lyrics: { songId: string; songTitle: string; artistName: string };
};

// ─── Root Tab Param List ────────────────────────────────────────

export type RootTabParamList = {
  ArtistsTab: NavigatorScreenParams<ArtistsStackParamList>;
  SongsTab: NavigatorScreenParams<SongsStackParamList>;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  SavedTab: NavigatorScreenParams<SavedStackParamList>;
};

// ─── Convenience types ──────────────────────────────────────────

/** All possible route names across the app */
export type AllRouteNames =
  | keyof ArtistsStackParamList
  | keyof SongsStackParamList
  | keyof SearchStackParamList
  | keyof SavedStackParamList
  | keyof RootTabParamList;
