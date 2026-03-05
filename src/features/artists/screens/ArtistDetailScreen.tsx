import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppScreen, AppText } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ArtistsStackParamList } from '@/app/navigationTypes';

type Props = NativeStackScreenProps<ArtistsStackParamList, 'ArtistDetail'>;

export default function ArtistDetailScreen({ route }: Props) {
  const { artistId, artistName } = route.params;

  return (
    <AppScreen>
      <AppText variant="pageTitle">{artistName}</AppText>
      <View style={styles.placeholder}>
        <AppText variant="pageSubtitle">
          🎵  Artist detail for &quot;{artistName}&quot; (ID: {artistId}) — Sprint 2
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
