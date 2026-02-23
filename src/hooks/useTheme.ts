import { useCallback } from 'react';
import { theme, Theme } from '@/theme';

/**
 * Hook to access the app theme.
 * All component/screen code should pull design values from here.
 *
 * Usage:
 *   const { colors, spacing, textVariants } = useTheme();
 */
export function useTheme(): Theme {
  return theme;
}

/**
 * Hook that returns a function to create theme-aware styles.
 *
 * Usage:
 *   const makeStyles = useThemedStyles();
 *   const styles = makeStyles((t) => ({
 *     container: { backgroundColor: t.colors.bgPrimary, padding: t.spacing.lg },
 *   }));
 */
export function useThemedStyles() {
  return useCallback(<T>(factory: (t: Theme) => T): T => {
    return factory(theme);
  }, []);
}
