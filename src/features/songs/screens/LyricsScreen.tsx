import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppScreen, AppText, AppButton, LyricsContent } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SongsStackParamList } from '@/app/navigationTypes';
import { useLyrics } from '@/hooks/queries/useLyrics';
import { useLyricsActions } from '@/hooks';
import { Ionicons } from '@expo/vector-icons'; 

type Props = NativeStackScreenProps<SongsStackParamList, 'Lyrics'>;

export default function LyricsScreen({ navigation, route }: Props) {
  const { songId, songTitle, artistName } = route.params;

  const { data: lyrics, isLoading } = useLyrics(songId);

  const { textSize, isSaved, handleToggleSave, handleShare, handleCycleTextSize } = useLyricsActions(songId, songTitle, artistName);

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
          onPress={() => handleToggleSave(lyrics)} 
          style={styles.flexBtn}
        />
        <AppButton 
          label="Share" 
          variant="secondary" 
          onPress={() => handleShare(lyrics)} 
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

      <LyricsContent
        lyrics={lyrics}
        isLoading={isLoading}
        textSize={textSize}
        variant="styled"
      />
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
});