import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing } from '@/theme';
import { AppText } from '../primitives/AppText';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: Readonly<LoadingSpinnerProps>) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText variant="pageSubtitle" color={colors.textTertiary} style={styles.message}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
  },
  message: {
    marginTop: spacing.md,
  },
});
