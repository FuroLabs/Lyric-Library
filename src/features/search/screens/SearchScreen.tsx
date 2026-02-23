import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppScreen, AppText } from '@/components';

/**
 * Search Screen — stub.
 *
 * Sprint 2 Tasks:
 *  - S2-13: AppSearchBar integration
 *  - S2-14: Filter chips (All / Artist / Song / Lyrics)
 *  - S2-15: Render results with ResultRow
 *  - S2-16: Recent searches persistence
 */
export default function SearchScreen() {
  return (
    <AppScreen>
      <AppText variant="pageTitle">Search</AppText>
      <View style={styles.placeholder}>
        <AppText variant="pageSubtitle">
          🔍  Search UI will be implemented here (Sprint 2)
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
