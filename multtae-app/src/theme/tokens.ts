/**
 * Multtae (물때) design tokens — ported from the Claude Design handoff
 * `_ds/.../tokens/*.css`. "Light liquid glass": lavender-blue gradient,
 * floating liquid blobs, translucent white glass panels, brand blue actions.
 *
 * CSS variables map 1:1 to the keys below. React Native has no CSS custom
 * properties, so consume these via `import { colors, radii, ... }`.
 */

export const colors = {
  // Brand — actions / active / "now"
  brand: '#0077FF',
  brandActive: '#005FCC',
  brandDisabled: 'rgba(0, 119, 255, 0.4)',
  brandTint: '#EBF3FF',
  brandSoft: '#B8D9FF',

  // Accent (coral-pink) — highlight / "now" tide point / tide badge
  accent: '#FF385C',
  accentActive: '#E00B41',
  accentTint: '#FFF0F3',
  accentSoft: '#FFC9D4',
  accentBorder: 'rgba(255, 56, 92, 0.2)',

  // Ink (text)
  ink: '#191C1E',
  body: '#434656',
  muted: '#737688',
  disabled: '#929292',

  // Liquid background
  bgStart: '#F0F4FD',
  bgEnd: '#E1E8F5',
  blobWhite: 'rgba(255, 255, 255, 0.9)',
  blobPink: 'rgba(255, 218, 214, 0.5)',
  blobBlue: 'rgba(220, 225, 255, 0.6)',

  // Glass surfaces (depth via opacity steps: 40 / 50 / 60%)
  glass: 'rgba(255, 255, 255, 0.4)',
  glassSoft: 'rgba(255, 255, 255, 0.5)',
  glassStrong: 'rgba(255, 255, 255, 0.6)',
  glassHeader: 'rgba(247, 249, 252, 0.7)',
  hairline: 'rgba(255, 255, 255, 0.6)',
  hairlineStrong: 'rgba(255, 255, 255, 0.8)',
  hairlineSoft: 'rgba(255, 255, 255, 0.3)',

  // Semantic
  error: '#BA1A1A',
  errorBg: '#FFDAD6',
  errorBorder: 'rgba(186, 26, 26, 0.15)',
  info: '#2E6FA3',
  chartLine: '#434656',
  chartGrid: '#C3C5D9',

  // Provider brand colors
  kakao: '#FEE500',
  kakaoInk: 'rgba(0, 0, 0, 0.85)',
  google: '#FFFFFF',
  googleInk: '#1F1F1F',
  googleBorder: '#747775',
  apple: '#000000',
  appleInk: '#FFFFFF',

  scrim: 'rgba(25, 28, 30, 0.25)',
  white: '#FFFFFF',
} as const;

// Background gradient stops for expo-linear-gradient (135deg).
export const bgGradient = {
  colors: [colors.bgStart, colors.bgEnd] as [string, string],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16, // buttons / inputs
  xl: 24, // glass cards
  tile: 30, // splash logo tile
  pill: 9999,
} as const;

export const spacing = {
  marginMobile: 20, // fixed screen side margin
  gutter: 12,
  stackSm: 8,
  stackMd: 16,
  stackLg: 24,
  stackXl: 40,
  safeBottom: 34, // home-indicator safe area
} as const;

// Blur radii for expo-blur `intensity` are approximated from the CSS blur px.
export const blur = {
  sm: 8,
  md: 16,
  lg: 20,
} as const;

/**
 * Shadows. RN needs platform-split style objects rather than a CSS string.
 * Depth is intentionally light (glass system keeps black shadows <= 5%).
 */
export const shadows = {
  glass: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 6,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  brand: {
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 16,
  },
} as const;

// Motion — slow, soft. `--mt-ease` cubic-bezier(0.25, 0.6, 0.3, 1).
export const motion = {
  durFast: 180,
  durBase: 250,
  easing: [0.25, 0.6, 0.3, 1] as const,
} as const;

export const layout = {
  maxWidth: 430, // phone frame max width from prototype
} as const;
