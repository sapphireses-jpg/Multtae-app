/**
 * Multtae logo — two overlapping waves (밀물 + 썰물). Ported from
 * assets/logo-wave.svg (blue variant, for light backgrounds).
 */
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/tokens';

export function WaveLogo({ size = 60, white = false }: { size?: number; white?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 96 96">
      <Path
        d="M20 41 Q29 32 38 41 T56 41 T74 41"
        stroke={white ? colors.white : colors.brand}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M22 59 Q31 50 40 59 T58 59 T76 59"
        stroke={colors.accentSoft}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}
