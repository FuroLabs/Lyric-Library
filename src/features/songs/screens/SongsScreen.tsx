import React, { useState, useMemo } from 'react';
import { View, StyleSheet, SectionList, useWindowDimensions, Platform } from 'react-native';
import { AppScreen, AppText, AppSearchBar, Chip, SongRow, LoadingState, EmptyState } from '@/components';
import { useSongs } from '@/hooks/queries/useSongs';
import { filterSongs } from '@/utils/filters';
import { groupByInitial } from '@/utils/groupers';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SongsStackParamList } from '@/app/navigationTypes';

/**
 * Songs Browse Screen — stub.
 *
 * Sprint 2 Tasks:
 *  - S2-07: Render song list using FlashList + SongRow
 *  - S2-08: Sort chips (Title / Artist / Recent / Popular)
 *  - S2-09: Navigate to LyricsScreen on tap
 */

const SORT_OPTIONS = [
  { key: 'title', label: 'A-Z' },
  { key: 'popular', label: 'Popular' },
  { key: 'recent', label: 'Recent' },
  { key: 'genre', label: 'Genre' },
];


export default function SongsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<SongsStackParamList>>();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'title' | 'artist' | 'recent' | 'popular'>('title');

  const { data: songs, isLoading, isError } = useSongs(sort);

  // Filter and group songs
  const filteredSongs = useMemo(() => songs ? filterSongs(songs, query) : [], [songs, query]);
  // groupByInitial expects T extends Record<string, string>, but Song has optional string fields. We'll cast for grouping by title.
  const grouped = useMemo(() => {
    if (!filteredSongs.length) return [];
    // groupByInitial expects Record<string, string>[]; map Song to { id, title, artistName }
    const stringSongs = filteredSongs.map(s => ({
      id: s.id,
      title: s.title || '',
      artistName: s.artistName || '',
    }));
    const groupedObj = groupByInitial(stringSongs, 'title');
    return Object.keys(groupedObj)
      .sort()
      .map(letter => ({ title: letter, data: groupedObj[letter] }));
  }, [filteredSongs]);

  // Responsive font scaling for title/subtitle
  const titleFontSize = isSmallScreen ? 28 : undefined;
  const subtitleFontSize = isSmallScreen ? 14 : undefined;

  return (
    <AppScreen style={[styles.screen, { paddingHorizontal: width * 0.04 }]}> {/* 4% padding */}
      <AppText variant="pageTitle" style={[styles.title, titleFontSize && { fontSize: titleFontSize }]}>
        Songs
      </AppText>
      <AppText variant="pageSubtitle" style={[styles.subtitle, subtitleFontSize && { fontSize: subtitleFontSize }]}>
        Browse all available lyrics
      </AppText>

      <View style={styles.searchBar}>
        <AppSearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search songs..."
          active={!!query}
        />
      </View>

      <View style={styles.chipRowWrapper}>
        <SectionList
          horizontal
          showsHorizontalScrollIndicator={false}
          sections={[{ title: '', data: SORT_OPTIONS }]}
          keyExtractor={item => item.key}
          renderSectionHeader={() => null}
          renderItem={({ item }) => (
            <Chip
              key={item.key}
              label={item.label}
              active={sort === item.key}
              onPress={() => setSort(item.key as typeof sort)}
              style={styles.chip}
            />
          )}
          contentContainerStyle={styles.chipRow}
          style={{ maxHeight: 48, minHeight: 40 }}
        />
      </View>

      {isLoading ? (
        <LoadingState message="Loading songs..." />
      ) : isError ? (
        <EmptyState title="Failed to load songs." />
      ) : (
        <SectionList
          sections={grouped}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <AppText variant="sectionHeader" style={styles.sectionHeader}>{title}</AppText>
          )}
          renderItem={({ item }) => (
            <SongRow
              title={item.title}
              meta={item.artistName}
              onPress={() => navigation.navigate('Lyrics', {
                songId: item.id,
                songTitle: item.title,
                artistName: item.artistName,
              })}
            />
          )}
          contentContainerStyle={grouped.length === 0 ? styles.emptyList : { paddingBottom: Platform.OS === 'ios' ? 32 : 16 }}
          ListEmptyComponent={<EmptyState title="No songs found." />}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: undefined,
  },
  title: {
    marginTop: 8,
    marginBottom: 0,
  },
  subtitle: {
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 12,
  },
  chipRowWrapper: {
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 0,
    minHeight: 40,
  },
  chip: {
    marginRight: 4,
    minWidth: 72,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 8,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
});
