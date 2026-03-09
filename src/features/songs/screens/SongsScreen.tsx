import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppScreen, AppText, AppButton } from '@/components';
import type { SongsStackParamList } from '@/app/navigationTypes';

/**
 * Songs Browse Screen.
 *
 * Features:
 *  - Search bar + sort/filter chips (A-Z / Popular / Recent / Genre)
 *  - Grouped SectionList with sticky headers
 *  - Navigate to LyricsScreen on song tap
 */

/**
 * Supported sort modes for SongsScreen
 */
type SongSortKey = SongSortMode;

const SORT_OPTIONS: { key: SongSortKey; label: string }[] = [
  { key: 'title', label: 'A-Z' },
  { key: 'popular', label: 'Popular' },
  { key: 'recent', label: 'Recent' },
  { key: 'genre', label: 'Genre' },
];


/**
 * SongsScreen displays a searchable, filterable, grouped list of songs.
 * - Search bar at top
 * - Filter chips for sort modes
 * - Grouped list by first letter with sticky section headers
 * - SongRow for each song, navigates to LyricsScreen
 * - Loading/empty states
 */
type Props = NativeStackScreenProps<SongsStackParamList, 'SongsList'>;

export default function SongsScreen({ navigation }: Props) {
  const handleAntiHeroPress = () => {
    navigation.navigate('Lyrics', {
      songId: 's02',
      songTitle: 'Anti-Hero',
      artistName: 'Taylor Swift',
    });
  };

  return (
    <AppScreen>
      <AppText variant="pageTitle">Songs</AppText>
      <AppButton label="Anti-Hero" onPress={handleAntiHeroPress} />
      <View style={styles.placeholder}>
        <AppText variant="pageSubtitle">
          🎶  Song list will be implemented here (Sprint 2)
          
        </AppText>
      </View>

      {isLoading && (
        <LoadingState message="Loading songs..." />
      )}
      {!isLoading && isError && (
        <EmptyState title="Failed to load songs." />
      )}
      {!isLoading && !isError && (
        <SectionList
          sections={grouped}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeaderContainer}>
              <AppText variant="sectionHeader" style={styles.sectionHeader}>{title}</AppText>
            </View>
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
          contentContainerStyle={grouped.length === 0 ? styles.emptyList : styles.songList}
          ListEmptyComponent={<EmptyState title="No songs found." />}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 8,
    marginBottom: 0,
  },
  titleSmall: {
    fontSize: 28,
  },
  subtitle: {
    marginBottom: 16,
  },
  subtitleSmall: {
    fontSize: 14,
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
    borderRadius: 20,
  },
  sectionHeader: {
    marginLeft: spacing.sm,
  },
  sectionHeaderContainer: {
    backgroundColor: colors.bgPrimary,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xs,
    zIndex: 2,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  songList: {
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
});
