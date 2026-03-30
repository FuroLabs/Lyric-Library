import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@/theme';
import { AppText } from '../primitives/AppText';
import { AppButton } from '../primitives/AppButton';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong',
  onRetry,
}: Readonly<ErrorStateProps>) {
  return (
    <View style={styles.container}>
      <AppText variant="detailTitle" center>
        Oops!
      </AppText>
      <AppText variant="pageSubtitle" center style={styles.message}>
        {message}
      </AppText>
      {onRetry ? (
        <AppButton label="Try again" variant="primary" onPress={onRetry} style={styles.retryButton} />
      ) : null}
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
  retryButton: {
    marginTop: spacing.xxl,
  },
});
