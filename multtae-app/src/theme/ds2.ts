/**
 * Multtae Design System v2 — "클린 화이트" (Airbnb 무드) tokens.
 * Ported from the Claude Design handoff: `DS v2 개정 스펙 (Airbnb 무드).md` and
 * the `:root` variables of `Main_FishSpecies_List_v9_DSv2.html` (도감 확정본).
 *
 * v1 "liquid glass" tokens live in `tokens.ts` and are still used by the login
 * flow; new DS v2 screens consume this module instead. White surfaces + 1px
 * borders replace glass panels; hierarchy comes from ink steps and weight.
 */
import type { TextStyle } from 'react-native';

export const ds2Colors = {
  brand: '#0077FF',
  brandActive: '#005FCC',
  accent: '#FF385C',

  ink: '#191C1E',
  body: '#434656',
  muted: '#737688',
  disabled: '#929292',

  borderStrong: '#dddddd', // inputs / emphasized borders
  border: '#ebebeb', // cards / dividers
  borderSoft: '#f2f2f2', // weak dividers
  borderDashed: '#c1c1c1', // report-card dashed border

  canvas: '#ffffff',
  canvasOuter: '#f2f2f2',
  tint: '#f7f7f7',
  pressed: '#fafafa',

  warning: '#7A4E00',
  warningBg: '#FFEFD3',

  // 블루 = 액션 + 성취 (수집률·뱃지 tint)
  brandTint: '#EBF3FF',
  brandTintLabel: '#3D77C2',
  // 코랄 = 새로움·주목 전용 (신기록 pill)
  accentTint: '#FFF0F3',

  // 강조 패널 그라데이션 (summary-top)
  panelGradient: ['#E7F1FF', '#F6FAFF', '#EFF6FF'] as [string, string, string],
  panelGradientLocations: [0, 0.62, 1] as [number, number, number],

  // 등급 (도감)
  rareStageBg: '#F0F4F7',
  rareStroke: '#5FA9FF',
  rareGradient: ['#EDF5FF', '#FFFFFF', '#D6E9FF'] as [string, string, string],
  uniqueStageBg: '#F8F3E7',
  uniqueStroke: '#D4AF37',
  uniqueGradient: ['#FFF8E4', '#FFFDF6', '#F3E2AC'] as [string, string, string],
  uniqueMarker: '#C9A227',

  ringTrack: 'rgba(0, 119, 255, 0.14)',
  scrim: 'rgba(0, 0, 0, 0.5)',
  white: '#FFFFFF',
} as const;

export const ds2Radii = {
  card: 14, // content cards
  panel: 16, // summary / hero cards
  stage: 10, // icon stage / square CTA
  sheet: 20, // bottom-sheet top corners
  pill: 9999,
} as const;

/** Noto Sans KR 단일 — 위계는 굵기+크기 대비로. */
export const ds2Font = {
  regular: 'NotoSansKR_400Regular',
  medium: 'NotoSansKR_500Medium',
  semibold: 'NotoSansKR_600SemiBold',
  bold: 'NotoSansKR_700Bold',
} as const;

/** Shorthand for the size/line-height pairs the DS v2 spec uses. */
export function ds2Text(
  family: keyof typeof ds2Font,
  fontSize: number,
  lineHeight: number,
  letterSpacing = 0,
): TextStyle {
  return { fontFamily: ds2Font[family], fontSize, lineHeight, letterSpacing };
}

/**
 * Airbnb식 레이어드 그림자. RN은 단일 그림자만 지원하므로 CSS 다중 그림자의
 * 가장 지배적인 레이어로 근사한다.
 */
export const ds2Shadows = {
  // rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.08) 0 4px 8px
  float: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  // 검색 pill: rgba(0,0,0,0.03) 0 1px 4px
  input: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  // 브랜드 CTA: rgba(0,119,255,0.30) 0 6px 14px
  brand: {
    shadowColor: ds2Colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
} as const;
