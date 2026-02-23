import React, { memo } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/theme';
import { AppText } from '../primitives/AppText';

interface SongRowProps {
  /** Song title */
  title: string;
  /** Metadata line (artist, album, year) */
  meta: string;
  /** Right-side action label (default: "View") */
  actionLabel?: string;
  /** Press handler for the whole row */
  onPress: () => void;
  /** Press handler for the action button (defaults to onPress) */
  onActionPress?: () => void;
}

/**
 * Song list row — title + meta on left, action button on right.
 * Matches wireframe .song-item layout.
 */
export const SongRow = memo(function SongRow({
  title,
  meta,
  actionLabel = 'View',
  onPress,
  onActionPress,
}: SongRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${title} by ${meta}`}
    >
      <View style={styles.info}>
        <AppText variant="itemTitle" numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="itemMeta" numberOfLines={1}>
          {meta}
        </AppText>
      </View>

      <Pressable
        onPress={onActionPress ?? onPress}
        hitSlop={4}
        style={styles.actionBtn}
        accessibilityRole="button"
        accessibilityLabel={`${actionLabel} ${title}`}
      >
        <AppText variant="actionLabel" color={colors.primary}>
          {actionLabel}
        </AppText>
      </Pressable>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.bgElevated,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  info: {
    flex: 1,
    marginRight: spacing.md,
  },
  actionBtn: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radii.sm,
  },
});
