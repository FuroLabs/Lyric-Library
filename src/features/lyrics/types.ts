import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Lyrics, LyricsSection, SavedLyric } from '@/types';

export type LyricsRouteParams = {
  songId: string;
  songTitle: string;
  artistName: string;
};

type LyricsNavigationParamList = {
  Lyrics: LyricsRouteParams;
};

export type LyricsScreenProps = Readonly<{
  route: RouteProp<LyricsNavigationParamList, 'Lyrics'>;
  navigation: NativeStackNavigationProp<LyricsNavigationParamList, 'Lyrics'>;
}>;

export interface LyricsSectionViewModel {
  id: string;
  type: LyricsSection['type'];
  label: string;
  lines: string[];
  isHighlight: boolean;
}

export interface LyricsDetailViewModel {
  songId: Lyrics['songId'];
  songTitle: Lyrics['songTitle'];
  artistName: Lyrics['artistName'];
  albumTitle?: Lyrics['albumTitle'];
  sections: LyricsSectionViewModel[];
  previewText: SavedLyric['previewText'];
}