/**
 * Type scale ported from `tokens/typography.css`.
 * Display = Jua (wordmark, tide badge "7물", big numbers).
 * Body = Noto Sans KR (400 / 500 / 700). Hierarchy is expressed through
 * weight contrast, not color.
 *
 * RN can't use the CSS `font` shorthand, so each token is a TextStyle with an
 * explicit fontFamily (the loaded custom-font key encodes the weight).
 */
import type { TextStyle } from 'react-native';

export const fontFamily = {
  display: 'Jua_400Regular',
  body: 'NotoSansKR_400Regular',
  medium: 'NotoSansKR_500Medium',
  bold: 'NotoSansKR_700Bold',
} as const;

export const type = {
  headlineLg: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  headlineMd: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
  },
  headlineSm: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },
  bodyLg: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    lineHeight: 20,
  },
  labelLg: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  labelMd: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 20,
  },
  displayMd: {
    fontFamily: fontFamily.display,
    fontSize: 34,
    lineHeight: 34 * 1.2,
  },
  displaySm: {
    fontFamily: fontFamily.display,
    fontSize: 19,
    lineHeight: 19 * 1.2,
  },
} satisfies Record<string, TextStyle>;
