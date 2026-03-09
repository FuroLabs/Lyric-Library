import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppText } from '@/components';
import { fontSize } from '@/theme/typography';
import type { LyricsTextSize, Lyrics } from '@/types/models';

interface LyricsContentProps {
  lyrics: Lyrics | null | undefined;
  isLoading: boolean;
  textSize: LyricsTextSize;
  variant?: 'default' | 'styled'; // to handle different styling variants
}

export function LyricsContent({
  lyrics,
  isLoading,
  textSize,
  variant = 'default'
}: LyricsContentProps) {
  const lyricFontScale = React.useMemo(() => {
    switch (textSize) {
      case 'small':
        return 0.9;
      case 'large':
        return 1.25;
      default:
        return 1;
    }
  }, [textSize]);

  if (isLoading) {
    return <AppText variant="pageSubtitle">Loading lyrics…</AppText>;
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={variant === 'styled'}
    >
      {lyrics?.sections.map((section, idx) => (
        <View key={`${section.label}-${idx}`} style={styles.section}>
          <AppText
            variant="verseLabel"
            style={variant === 'styled' ? styles.styledVerseLabel : undefined}
          >
            {variant === 'styled' ? section.label.toUpperCase() : section.label}
          </AppText>
          {section.lines.map((line, li) => (
            <AppText
              key={`line-${li}`}
              variant="lyricLine"
              style={[
                variant === 'styled' ? styles.lyricLineStyled : styles.lyricLine,
                { 
                  fontSize: fontSize.lg * lyricFontScale,
                  ...(variant === 'styled' ? { lineHeight: (fontSize.lg * lyricFontScale) * 1.5 } : {})
                }
              ]}
            >
              {line}
            </AppText>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 18,
  },
  styledVerseLabel: {
    color: '#999',
    letterSpacing: 1.2,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  lyricLine: {
    fontSize: fontSize.lg,
    marginTop: 6,
  },
  lyricLineStyled: {
    fontSize: fontSize.lg,
    marginTop: 8,
    lineHeight: fontSize.lg * 1.5,
    color: '#333',
  },
});