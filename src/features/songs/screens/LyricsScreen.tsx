import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Share, TouchableOpacity } from 'react-native';
import { AppScreen, AppText, AppButton } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SongsStackParamList } from '@/app/navigationTypes';
import { useLyrics } from '@/hooks/queries/useLyrics';
import { useSavedStore } from '@/store/savedStore';
import type { SavedLyric, LyricsTextSize } from '@/types/models';
import { fontSize } from '@/theme/typography';
import { Ionicons } from '@expo/vector-icons'; 

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
      case 'small': return 0.9;
      case 'large': return 1.25;
      default: return 1;
    }
  }, [textSize]);

  const handleToggleSave = () => {
    if (!lyrics) return;
    if (isSaved) {
      removeLyric(songId);
      return;
    }

    const previewText = lyrics.sections?.[0]?.lines?.slice(0, 2).join(' ') ?? songTitle;

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
    } catch (e) { /* no-op */ }
  };

  const handleCycleTextSize = () => {
    const idx = TEXT_SIZE_ORDER.indexOf(textSize);
    const next = TEXT_SIZE_ORDER[(idx + 1) % TEXT_SIZE_ORDER.length];
    setTextSize(next);
  };

  return (
    <AppScreen style={styles.container}>
      {/* Back Icon Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backIconButton}
      >
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Left Aligned Header */}
      <View style={styles.headerMeta}>
        <AppText variant="sectionTitle" style={styles.titleText}>
          {lyrics?.songTitle ?? songTitle}
        </AppText>
        <AppText variant="itemMeta" style={styles.subtitleText}>
          {lyrics?.artistName ?? artistName}
          {lyrics?.albumTitle ? ` · ${lyrics.albumTitle}` : ''}
        </AppText>
      </View>

      {/* Action Buttons Row */}
      <View style={styles.actionsRow}>
        <AppButton 
          label={isSaved ? 'Saved' : 'Save'} 
          variant="primary" 
          onPress={handleToggleSave} 
          style={styles.flexBtn}
        />
        <AppButton 
          label="Share" 
          variant="secondary" 
          onPress={handleShare} 
          style={styles.flexBtn}
        />
        <AppButton 
          label="Text Size" 
          variant="tertiary" 
          onPress={handleCycleTextSize} 
          style={styles.flexBtn}
        />
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {isLoading ? (
        <AppText variant="pageSubtitle">Loading lyrics…</AppText>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={true}
          style={styles.scroll} 
          contentContainerStyle={styles.scrollContent}
        >
          {lyrics?.sections.map((section, idx) => (
            <View key={`${section.label}-${idx}`} style={styles.section}>
              <AppText variant="verseLabel" style={styles.verseLabel}>
                {section.label.toUpperCase()}
              </AppText>
              {section.lines.map((line, li) => (
                <AppText
                  key={`line-${li}`}
                  variant="lyricLine"
                  style={{ 
                    fontSize: fontSize.lg * lyricFontScale, 
                    lineHeight: (fontSize.lg * lyricFontScale) * 1.5,
                    marginTop: 8,
                    color: '#333'
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
  container: {
    backgroundColor: '#FDFBF4',
    paddingHorizontal: 20,
    flex: 1, // Ensures it takes up the full screen height
  },
  backIconButton: {
    marginTop: 10,
    marginLeft: -10,
    padding: 10,
  },
  headerMeta: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'serif',
    color: '#1a1a1a',
  },
  subtitleText: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  flexBtn: {
    flex: 1,
    borderRadius: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
    marginBottom: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40, // Keeps content from hitting the bottom of the screen
  },
  section: {
    marginBottom: 30,
  },
  verseLabel: {
    color: '#999',
    letterSpacing: 1.2,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
});