import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppScreen, AppText, AppButton, LyricsContent } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SongsStackParamList } from '@/app/navigationTypes';
import { useLyrics } from '../hooks/useLyrics';
import { useLyricsActions } from '@/hooks';

type Props = NativeStackScreenProps<SongsStackParamList, 'Lyrics'>;

export default function LyricsScreen({ navigation, route }: Props) {
  const { songId, songTitle, artistName } = route.params;

  const { data: lyrics, isLoading } = useLyrics(songId);

  const { textSize, isSaved, handleToggleSave, handleShare, handleCycleTextSize } = useLyricsActions(songId, songTitle, artistName);

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
          onPress={() => handleToggleSave(lyrics)}
        />

        <AppButton
          label="Share"
          variant="secondary"
          onPress={() => handleShare(lyrics)}
        />

        <AppButton
          label={`Text Size`}
          variant="tertiary"
          onPress={handleCycleTextSize}
        />
      </View>

      {/* Lyrics */}
      <LyricsContent
        lyrics={lyrics}
        isLoading={isLoading}
        textSize={textSize}
      />

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

});