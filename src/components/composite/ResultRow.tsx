import React, { memo } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/theme';
import { AppText } from '../primitives/AppText';

interface ResultRowProps {
  /** Display initial / letter for icon */
  initial: string;
  /** Result title (song name, artist name, album name) */
  title: string;
  /** Subtitle (artist + album, or song count) */
  subtitle: string;
  /** Result type to control icon shape/color */
  type: 'song' | 'artist' | 'album';
  /** Press handler */
  onPress: () => void;
}

/**
 * Search result row — icon + title + subtitle.
 * Matches wireframe .result-item layout.
 */
export const ResultRow = memo(function ResultRow({
  initial,
  title,
  subtitle,
  type,
  onPress,
}: ResultRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${type}: ${title}, ${subtitle}`}
    >
      <View
        style={[
          styles.icon,
          type === 'artist' ? styles.iconArtist : null,
          type === 'album' ? styles.iconAlbum : null,
          type === 'song' ? styles.iconSong : null,
        ]}
      >
        <AppText variant="avatarLetterSmall" color={colors.white}>
          {initial}
        </AppText>
      </View>

      <View style={styles.info}>
        <AppText variant="itemTitle" numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="itemMeta" numberOfLines={1}>
          {subtitle}
        </AppText>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bgElevated,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  icon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconArtist: {
    borderRadius: radii.lg,
    backgroundColor: colors.primary,
  },
  iconSong: {
    borderRadius: radii.lg,
    backgroundColor: colors.accent,
  },
  iconAlbum: {
    borderRadius: radii.sm,
    backgroundColor: colors.secondary,
  },
  info: {
    flex: 1,
  },
});
