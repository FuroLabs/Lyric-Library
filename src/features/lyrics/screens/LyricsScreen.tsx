import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Share, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      await Share.share({
        message: text,
        title: lyrics.songTitle,
      });
    } catch (e) {}
  };

  const handleCycleTextSize = () => {
    const idx = TEXT_SIZE_ORDER.indexOf(textSize);
    const next = TEXT_SIZE_ORDER[(idx + 1) % TEXT_SIZE_ORDER.length];
    setTextSize(next);
  };

  return (
    <AppScreen>

      {/* Header */}
      <View style={styles.headerRow}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <AppText variant="sectionTitle">
            {lyrics?.songTitle ?? songTitle}
          </AppText>

          <AppText variant="itemMeta">
            {lyrics?.artistName ?? artistName}
            {lyrics?.albumTitle ? ` · ${lyrics.albumTitle}` : ''}
          </AppText>
        </View>

      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <AppButton
          label={isSaved ? 'Saved' : 'Save'}
          variant="primary"
          onPress={handleToggleSave}
        />

        <AppButton
          label="Share"
          variant="secondary"
          onPress={handleShare}
        />

        <AppButton
          label={`Text Size`}
          variant="tertiary"
          onPress={handleCycleTextSize}
        />
      </View>

      {/* Lyrics */}
      {isLoading ? (
        <AppText variant="pageSubtitle">Loading lyrics…</AppText>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          {lyrics?.sections.map((section, idx) => (
            <View key={`${section.label}-${idx}`} style={styles.section}>

              <AppText variant="verseLabel">
                {section.label}
              </AppText>

              {section.lines.map((line, li) => (
                <AppText
                  key={`line-${li}`}
                  variant="lyricLine"
                  style={{
                    fontSize: fontSize.lg * lyricFontScale,
                    marginTop: 6,
                  }}
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
    marginBottom: 10,
  },

  headerText: {
    marginLeft: 10,
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