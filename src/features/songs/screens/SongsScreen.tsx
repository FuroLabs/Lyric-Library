import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppScreen, AppText, AppButton } from '@/components';
import type { SongsStackParamList } from '@/app/navigationTypes';

/**
 * Songs Browse Screen — stub.
 *
 * Sprint 2 Tasks:
 *  - S2-07: Render song list using FlashList + SongRow
 *  - S2-08: Sort chips (Title / Artist / Recent / Popular)
 *  - S2-09: Navigate to LyricsScreen on tap
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
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
