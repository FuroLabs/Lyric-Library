import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppScreen, AppText } from '@/components';

/**
 * Songs Browse Screen — stub.
 *
 * Sprint 2 Tasks:
 *  - S2-07: Render song list using FlashList + SongRow
 *  - S2-08: Sort chips (Title / Artist / Recent / Popular)
 *  - S2-09: Navigate to LyricsScreen on tap
 */
export default function SongsScreen() {
  return (
    <AppScreen>
      <AppText variant="pageTitle">Songs</AppText>
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
