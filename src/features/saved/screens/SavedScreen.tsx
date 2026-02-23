import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppScreen, AppText } from '@/components';

/**
 * Saved Collection Screen — stub.
 *
 * Sprint 3 Tasks:
 *  - S3-03: Display saved lyrics list from Zustand store
 *  - S3-04: Tabs: All / Recently Saved
 *  - S3-05: Swipe-to-delete gesture
 *  - S3-06: Empty state with CTA
 */
export default function SavedScreen() {
  return (
    <AppScreen>
      <AppText variant="pageTitle">Saved</AppText>
      <View style={styles.placeholder}>
        <AppText variant="pageSubtitle">
          ❤️  Saved lyrics collection will appear here (Sprint 3)
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
