import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Share } from 'react-native';
import { AppScreen, AppText, AppButton } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SongsStackParamList } from '@/app/navigationTypes';
import { useLyrics } from '../hooks/useLyrics';
import { useSavedStore } from '@/store/savedStore';
import type { SavedLyric } from '@/types/models';
import type { LyricsTextSize } from '../types';
import { fontSize } from '@/theme/typography';

type Props = NativeStackScreenProps<SongsStackParamList, 'Lyrics'>;

const TEXT_SIZE_ORDER: LyricsTextSize[] = ['normal', 'large', 'small'];

export default function LyricsScreen({ navigation, route }: Props) {
  const { songId, songTitle, artistName } = route.params;

  const { data: lyrics, isLoading } = useLyrics(songId);

  const isSaved = useSavedStore((s) => s.isSaved(songId));
  const saveLyric = useSavedStore((s) => s.saveLyric);
  const removeLyric = useSavedStore((s) => s.removeLyric);

  const [textSize, setTextSize] = useState<LyricsTextSize>('normal');

  const lyricFontScale = useMemo(() => {
    switch (textSize) {
      case 'small':
        return 0.9;
      case 'large':
        return 1.25;
      default:
        return 1;
    }
  }, [textSize]);

  const handleToggleSave = () => {
    if (!lyrics) return;
    if (isSaved) {
      removeLyric(songId);
      return;
    }

    const previewText =
      lyrics.sections?.[0]?.lines?.slice(0, 2).join(' ') ?? songTitle;

    const entry: SavedLyric = {
      lyricId: `lyric-${songId}`,
      songId,
      songTitle: lyrics.songTitle ?? songTitle,
      artistName: lyrics.artistName ?? artistName,
      previewText,
      savedAt: Date.now(),
      viewCount: 1,
    };

    saveLyric(entry);
  };

  const handleShare = async () => {
    if (!lyrics) return;
    const text = [
      `${lyrics.songTitle} — ${lyrics.artistName}`,
      '',
      ...lyrics.sections.flatMap((s) => [s.label, ...s.lines, '']),
    ].join('\n');

    try {
      await Share.share({ message: text, title: lyrics.songTitle });
    } catch (e) {
      // ignore
    }
  };

  const handleCycleTextSize = () => {
    const idx = TEXT_SIZE_ORDER.indexOf(textSize);
    const next = TEXT_SIZE_ORDER[(idx + 1) % TEXT_SIZE_ORDER.length];
    setTextSize(next);
  };

  return (
    <AppScreen>
      <View style={styles.headerRow}>
        <AppButton label="Back" variant="tertiary" onPress={() => navigation.goBack()} />
        <View style={styles.headerMeta}>
          <AppText variant="sectionTitle">{lyrics?.songTitle ?? songTitle}</AppText>
          <AppText variant="itemMeta">{lyrics?.artistName ?? artistName}{lyrics?.albumTitle ? ` · ${lyrics.albumTitle}` : ''}</AppText>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <AppButton label={isSaved ? 'Saved' : 'Save'} variant="primary" onPress={handleToggleSave} />
        <AppButton label="Share" variant="secondary" onPress={handleShare} />
        <AppButton label={`Text: ${textSize}`} variant="tertiary" onPress={handleCycleTextSize} />
      </View>

      {isLoading ? (
        <AppText variant="pageSubtitle">Loading lyrics…</AppText>
      ) : (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {lyrics?.sections.map((section, idx) => (
            <View key={`${section.label}-${idx}`} style={styles.section}>
              <AppText variant="verseLabel">{section.label}</AppText>
              {section.lines.map((line, li) => (
                <AppText
                  key={`line-${li}`}
                  variant="lyricLine"
                  style={{ fontSize: fontSize.lg * lyricFontScale, marginTop: 6 }}
                >
                  {line}
                </AppText>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  headerMeta: {
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 18,
  },
});
