import { ViewStyle } from 'react-native';

/** Elevation/shadow presets matching wireframe box-shadows */
export const shadows = {
  /** Subtle card shadow — box-shadow: 0 2px 8px rgba(0,0,0,0.04) */
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  } satisfies ViewStyle,

  /** Search bar active — box-shadow: 0 4px 16px rgba(124,58,237,0.2) */
  searchActive: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  } satisfies ViewStyle,

  /** Avatar glow — box-shadow: 0 8px 24px rgba(124,58,237,0.3) */
  avatarGlow: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 6,
  } satisfies ViewStyle,

  /** No shadow */
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ViewStyle,
} as const;

export type ShadowKey = keyof typeof shadows;
