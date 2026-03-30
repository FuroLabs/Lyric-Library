import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@/theme';
import { AppText } from '../primitives/AppText';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export function EmptyState({ title, subtitle }: Readonly<EmptyStateProps>) {
  return (
    <View style={styles.container}>
      <AppText variant="detailTitle" center>
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="pageSubtitle" center style={styles.subtitle}>
          {subtitle}
        </AppText>
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
  subtitle: {
    marginTop: spacing.md,
  },
});
