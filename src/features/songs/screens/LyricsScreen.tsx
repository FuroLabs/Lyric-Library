import React, { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { AppScreen, AppText, EmptyState, ErrorState, LoadingState } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SongsStackParamList } from '@/app/navigationTypes';
import { useLyrics } from '@/hooks/queries/useLyrics';
import { lyricsRepository } from '@/services';
import { useSavedStore } from '@/store';
import { colors, radii, shadows, spacing } from '@/theme';
import type { LyricsTextSize, SavedLyric } from '@/types';

type Props = NativeStackScreenProps<SongsStackParamList, 'Lyrics'>;

const TEXT_SIZE_ORDER: LyricsTextSize[] = ['small', 'normal', 'large'];

const lyricLineOverrides: Record<LyricsTextSize, { fontSize: number; lineHeight: number }> = {
  small: { fontSize: 16, lineHeight: 26 },
  normal: { fontSize: 17.6, lineHeight: 31 },
  large: { fontSize: 20, lineHeight: 34 },
};

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

function getNextTextSize(size: LyricsTextSize): LyricsTextSize {
  const currentIndex = TEXT_SIZE_ORDER.indexOf(size);
  return TEXT_SIZE_ORDER[(currentIndex + 1) % TEXT_SIZE_ORDER.length];
}

export default function LyricsScreen({ route, navigation }: Readonly<Props>) {
  const { songId, songTitle, artistName } = route.params;
  const [textSize, setTextSize] = useState<LyricsTextSize>('normal');
  const { data: lyrics, isLoading, isError, refetch } = useLyrics(songId);
  const { data: song } = useQuery({
    queryKey: ['song', songId],
    queryFn: () => lyricsRepository.getSongById(songId),
    enabled: !!songId,
  });
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

  const previewText = useMemo(
    () => lyrics?.sections.flatMap((section) => section.lines).find(Boolean) ?? songTitle,
    [lyrics, songTitle],
  );

  const headerMeta = song?.albumTitle
    ? `${lyrics?.artistName ?? artistName} • ${song.albumTitle}`
    : lyrics?.artistName ?? artistName;

  const handleSaveToggle = () => {
    if (!lyrics) {
      return;
    }

    if (isSaved) {
      removeLyric(songId);
      return;
    }

    saveLyric(buildSavedLyric(songId, lyrics.songTitle, lyrics.artistName, previewText));
  };

  const handleShare = async () => {
    if (!lyrics) {
      return;
    }

    const shareText = [
      `${lyrics.songTitle} - ${lyrics.artistName}`,
      '',
      ...lyrics.sections.flatMap((section) => [section.label.toUpperCase(), ...section.lines, '']),
    ]
      .join('\n')
      .trim();

    await Share.share({
      message: shareText,
      title: `${lyrics.songTitle} lyrics`,
    });
  };

  const handleTextSizeToggle = () => {
    setTextSize((currentSize) => getNextTextSize(currentSize));
  };

  const lyricLineStyle = lyricLineOverrides[textSize];

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
        <ErrorState message="Could not load lyrics." onRetry={refetch} />
      </AppScreen>
    );
  }

  if (!lyrics) {
    return (
      <AppScreen>
        <EmptyState title="Lyrics unavailable" subtitle="No lyrics found for this song." />
      </AppScreen>
    );
  }

  return (
    <AppScreen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          hitSlop={10}
        >
          <AppText variant="pageSubtitle" style={styles.backIcon}>
            {'<'}
          </AppText>
        </Pressable>

        <View style={styles.header}>
          <AppText variant="sectionTitle">{lyrics.songTitle}</AppText>
          <AppText variant="pageSubtitle" color={colors.textSecondary} style={styles.metaText}>
            {headerMeta}
          </AppText>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={handleSaveToggle}
            style={({ pressed }) => [styles.actionButton, styles.actionPrimary, pressed && styles.pressed]}
          >
            <AppText variant="actionLabel" color={colors.white} center>
              {isSaved ? 'Saved' : 'Save'}
            </AppText>
          </Pressable>

          <Pressable
            onPress={handleShare}
            style={({ pressed }) => [styles.actionButton, styles.actionSecondary, pressed && styles.pressed]}
          >
            <AppText variant="actionLabel" center>
              Share
            </AppText>
          </Pressable>

          <Pressable
            onPress={handleTextSizeToggle}
            style={({ pressed }) => [styles.actionButton, styles.actionSecondary, pressed && styles.pressed]}
          >
            <AppText variant="actionLabel" center>
              Text Size
            </AppText>
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.lyricsBody}>
          {lyrics.sections.map((section, sectionIndex) => (
            <View key={`${section.label}-${sectionIndex}`} style={styles.sectionBlock}>
              <AppText variant="verseLabel" style={styles.sectionLabel}>
                {section.label}
              </AppText>

              {section.lines.map((line, lineIndex) => (
                <AppText
                  key={`${section.label}-${lineIndex}`}
                  variant="lyricLine"
                  style={[styles.lyricLine, lyricLineStyle]}
                >
                  {line}
                </AppText>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bgPrimary,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  backIcon: {
    fontSize: 30,
    lineHeight: 30,
    color: colors.textPrimary,
  },
  header: {
    marginBottom: spacing.xl,
  },
  metaText: {
    marginTop: spacing.xs,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  actionButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  actionPrimary: {
    backgroundColor: colors.primary,
    ...shadows.searchActive,
  },
  actionSecondary: {
    backgroundColor: colors.bgPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.xl,
  },
  lyricsBody: {
    flex: 1,
  },
  sectionBlock: {
    marginBottom: spacing.xxxl,
  },
  sectionLabel: {
    marginBottom: spacing.md,
    color: colors.textTertiary,
  },
  lyricLine: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.84,
  },
});
