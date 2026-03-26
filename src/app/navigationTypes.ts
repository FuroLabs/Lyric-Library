/**
 * Navigation route types — single source of truth for all navigation params.
 *
 * Usage in screens:
 *   import { ArtistsStackParamList } from '@/app/navigationTypes';
 *   type Props = NativeStackScreenProps<ArtistsStackParamList, 'ArtistDetail'>;
 *
 * For shared screens (Lyrics) used across multiple stacks, use:
 *   import type { NativeStackScreenProps } from '@react-navigation/native-stack';
 *   import type { ArtistsStackParamList, SongsStackParamList, SearchStackParamList, SavedStackParamList } from '@/app/navigationTypes';
 *   type Props = NativeStackScreenProps<ArtistsStackParamList, 'Lyrics'>;
 *
 * Or use the shared LyricsParams type for manual route params extraction:
 *   import type { LyricsParams } from '@/app/navigationTypes';
 *   const { songId, songTitle, artistName } = route.params as LyricsParams;
 */
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// ─── Shared Param Types ──────────────────────────────────────────
// These define the params for screens that are reused across multiple stacks

export type ArtistDetailParams = { artistId: string; artistName: string };
export type AlbumDetailParams = { albumId: string; albumName: string; artistId: string; artistName: string };
export type LyricsParams = { songId: string; songTitle: string; artistName: string };

// ─── Stack Param Lists ───────────────────────────────────────────

export type ArtistsStackParamList = {
  ArtistsList: undefined;
  ArtistDetail: ArtistDetailParams;
  AlbumDetail: AlbumDetailParams;
  Lyrics: LyricsParams;
};

export type SongsStackParamList = {
  SongsList: undefined;
  Lyrics: LyricsParams;
};

export type SearchStackParamList = {
  SearchMain: undefined;
  ArtistDetail: ArtistDetailParams;
  AlbumDetail: AlbumDetailParams;
  Lyrics: LyricsParams;
};

export type SavedStackParamList = {
  SavedList: undefined;
  Lyrics: LyricsParams;
};

// ─── Root Tab Param List ────────────────────────────────────────

export type RootTabParamList = {
  ArtistsTab: NavigatorScreenParams<ArtistsStackParamList>;
  SongsTab:   NavigatorScreenParams<SongsStackParamList>;
  SearchTab:  NavigatorScreenParams<SearchStackParamList>;
  SavedTab:   NavigatorScreenParams<SavedStackParamList>;
};

// ─── Convenience types ──────────────────────────────────────────

export type AllRouteNames =
  | keyof ArtistsStackParamList
  | keyof SongsStackParamList
  | keyof SearchStackParamList
  | keyof SavedStackParamList
  | keyof RootTabParamList;

// ─── Navigation Hook Types ──────────────────────────────────────
// Use these types with useNavigation() for full type safety

export type ArtistsStackNavProp<T extends keyof ArtistsStackParamList = keyof ArtistsStackParamList> =
  NativeStackNavigationProp<ArtistsStackParamList, T>;

export type SongsStackNavProp<T extends keyof SongsStackParamList = keyof SongsStackParamList> =
  NativeStackNavigationProp<SongsStackParamList, T>;

export type SearchStackNavProp<T extends keyof SearchStackParamList = keyof SearchStackParamList> =
  NativeStackNavigationProp<SearchStackParamList, T>;

export type SavedStackNavProp<T extends keyof SavedStackParamList = keyof SavedStackParamList> =
  NativeStackNavigationProp<SavedStackParamList, T>;
