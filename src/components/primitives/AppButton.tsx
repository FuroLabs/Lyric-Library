import React from 'react';
import { Pressable, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { colors, spacing, radii } from '@/theme';
import { AppText } from './AppText';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface AppButtonProps {
  /** Button label */
  label: string;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Press handler */
  onPress: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state (shows spinner, disables press) */
  loading?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

/**
 * Themed button with 3 variants matching wireframe action buttons.
 *
 * Usage:
 *   <AppButton label="Save" variant="primary" onPress={handleSave} />
 *   <AppButton label="Share" variant="secondary" onPress={handleShare} />
 */
export function AppButton({
  label,
  variant = 'primary',
  onPress,
  disabled = false,
  loading = false,
  style,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary}
        />
      ) : (
        <AppText
          variant="actionLabel"
          color={variant === 'primary' ? colors.white : colors.primary}
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
  },
  tertiary: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.border,
  },
};
