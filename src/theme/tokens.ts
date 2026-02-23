/**
 * Lyric Library — Design Tokens
 *
 * IMPORTANT: All color, spacing, and visual values MUST come from this file.
 * Never hardcode hex values, pixel sizes, or font configs in screen/component code.
 *
 * These tokens are derived directly from the approved wireframe:
 * /lyrics-library-wireframes.html
 */

export const colors = {
  // Brand
  primary: '#7C3AED',
  secondary: '#EC4899',
  accent: '#F59E0B',

  // Backgrounds
  bgPrimary: '#FDFBF7',
  bgSecondary: '#F5F1E8',
  bgElevated: '#FFFFFF',

  // Text
  textPrimary: '#1F1B16',
  textSecondary: '#6B6557',
  textTertiary: '#9E9788',

  // Borders
  border: '#E8E3D8',

  // Semantic
  error: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',

  // Overlays
  overlayLight: 'rgba(0, 0, 0, 0.04)',
  overlayMedium: 'rgba(0, 0, 0, 0.1)',

  // Active states
  primaryLight: 'rgba(124, 58, 237, 0.1)',
  secondaryLight: 'rgba(236, 72, 153, 0.1)',

  // Pure
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

/** Gradient stop arrays for use with LinearGradient */
export const gradients = {
  /** Primary brand gradient: purple → pink */
  gradient1: {
    colors: ['#7C3AED', '#EC4899'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  /** Accent gradient: amber → pink */
  gradient2: {
    colors: ['#F59E0B', '#EC4899'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

export type ColorKey = keyof typeof colors;
