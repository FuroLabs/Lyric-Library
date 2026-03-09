import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppButton, AppScreen, AppText, EmptyState, ErrorState, LoadingState } from '@/components';
import { useSavedStore } from '@/store';
import { colors, radii, shadows, spacing } from '@/theme';
import type { SavedLyric } from '@/types';
import { useLyrics } from '../hooks/useLyrics';
import type { LyricsScreenProps } from '../types';

function buildSavedLyric(songId: string, songTitle: string, artistName: string, previewText: string): SavedLyric {
  return {
    lyricId: songId,
    songId,
    songTitle,
    artistName,
    previewText,
    savedAt: Date.now(),
    viewCount: 0,
  };
}

export default function LyricsScreen({ route, navigation }: LyricsScreenProps) {
  const { songId, songTitle, artistName } = route.params;
  const { data, isLoading, isError, refetch } = useLyrics(songId);
  const isSaved = useSavedStore((state) => state.isSaved(songId));
  const saveLyric = useSavedStore((state) => state.saveLyric);
  const removeLyric = useSavedStore((state) => state.removeLyric);

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: 'none' } });

      return () => parent?.setOptions({ tabBarStyle: undefined });
    }, [navigation]),
  );

  const handleSaveToggle = () => {
    if (!data) {
      return;
    }

    if (isSaved) {
      removeLyric(songId);
      return;
    }

    saveLyric(buildSavedLyric(songId, data.songTitle, data.artistName, data.previewText));
  };

  if (isLoading) {
    return (
      <AppScreen>
        <LoadingState message="Loading lyrics..." />
      </AppScreen>
    );
  }

  if (isError) {
    return (
      <AppScreen>
        <ErrorState message="Could not load the lyrics for this song." onRetry={refetch} />
      </AppScreen>
    );
  }

  if (!data) {
    return (
      <AppScreen>
        <EmptyState
          title="Lyrics unavailable"
          subtitle="This song does not have any lyrics content yet."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          hitSlop={10}
        >
          <AppText variant="pageSubtitle" style={styles.backChevron}>
            {'<'}
          </AppText>
        </Pressable>

        <View style={styles.headerCard}>
          <AppText variant="sectionTitle">{data.songTitle ?? songTitle}</AppText>
          <AppText variant="pageSubtitle" style={styles.headerMeta}>
            {data.artistName ?? artistName}
          </AppText>
          {data.albumTitle ? (
            <AppText variant="itemMeta" color={colors.textTertiary}>
              {data.albumTitle}
            </AppText>
          ) : null}

          <View style={styles.actionsRow}>
            <AppButton
              label={isSaved ? 'Remove' : 'Save'}
              variant={isSaved ? 'tertiary' : 'primary'}
              onPress={handleSaveToggle}
              style={styles.actionButton}
            />
            <View style={styles.metaPill}>
              <AppText variant="actionLabel" color={colors.primary}>
                {data.sections.length} sections
              </AppText>
            </View>
          </View>
        </View>

        {data.sections.length === 0 ? (
          <View style={styles.emptyCard}>
            <EmptyState
              title="No lyric sections"
              subtitle="Lyrics were found, but there are no displayable lines yet."
            />
          </View>
        ) : (
          data.sections.map((section) => (
            <View
              key={section.id}
              style={[styles.sectionCard, section.isHighlight && styles.highlightSection]}
            >
              <AppText variant="verseLabel" style={styles.sectionLabel}>
                {section.label}
              </AppText>

              {section.lines.map((line, index) => (
                <AppText key={`${section.id}-${index}`} variant="lyricLine" style={styles.lyricLine}>
                  {line}
                </AppText>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bgPrimary,
  },
  scrollContent: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  backChevron: {
    fontSize: 30,
    lineHeight: 30,
    color: colors.textPrimary,
  },
  pressed: {
    opacity: 0.8,
  },
  headerCard: {
    backgroundColor: colors.bgElevated,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxl,
    marginBottom: spacing.xl,
    ...shadows.card,
  },
  headerMeta: {
    marginTop: spacing.xs,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  actionButton: {
    flex: 1,
    marginRight: spacing.md,
  },
  metaPill: {
    borderRadius: radii.pill,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  emptyCard: {
    minHeight: 240,
    backgroundColor: colors.bgElevated,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionCard: {
    backgroundColor: colors.bgElevated,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  highlightSection: {
    backgroundColor: colors.primaryLight,
  },
  sectionLabel: {
    marginBottom: spacing.md,
  },
  lyricLine: {
    marginBottom: spacing.sm,
  },
});