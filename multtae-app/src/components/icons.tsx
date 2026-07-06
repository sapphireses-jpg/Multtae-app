/**
 * Line SVG icons + provider brand marks, ported from the prototype.
 * Icon system: 2.5px stroke, round caps/joins, single color (via `color`).
 * Provider logos keep their official brand geometry and colors.
 */
import React from 'react';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';
import { colors } from '../theme/tokens';

type IconProps = { size?: number; color?: string };

export function ChevronRight({ size = 12, color = colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M6 3.5 L10.5 8 L6 12.5"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ErrorCircle({ size = 16, color = colors.error }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={6.5} stroke={color} strokeWidth={1.8} fill="none" />
      <Path d="M8 4.8 V8.6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={8} cy={11.2} r={1} fill={color} />
    </Svg>
  );
}

export function CloseIcon({ size = 14, color = colors.body }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Path
        d="M3 3 L11 11 M11 3 L3 11"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function DocIcon({ size = 32, color = colors.chartGrid }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={3} y={4} width={18} height={16} rx={3} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M3 9 H21" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

/** Fish/catch mark (slide 2 list rows). */
export function FishIcon({ size = 18, color = colors.brand }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M4 16 C4 10 8 4 16 4 C16 12 10 16 4 16 Z M4 16 L9 11"
        stroke={color}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** ∧ rising (밀물) chevron. */
export function ChevronUp({ size = 18, color = colors.info }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M4 13 L10 6 L16 13"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** ∨ falling (썰물) chevron. */
export function ChevronDown({ size = 18, color = colors.info }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M4 7 L10 14 L16 7"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Camera (Permission_Request card). Geometry from the design handoff. */
export function CameraIcon({ size = 22, color = colors.brand }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3.5 8.5 A 2 2 0 0 1 5.5 6.5 H 8 L 9.6 4.4 A 1.6 1.6 0 0 1 10.9 3.8 H 13.1 A 1.6 1.6 0 0 1 14.4 4.4 L 16 6.5 H 18.5 A 2 2 0 0 1 20.5 8.5 V 17.5 A 2 2 0 0 1 18.5 19.5 H 5.5 A 2 2 0 0 1 3.5 17.5 Z"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12.8} r={3.4} stroke={color} strokeWidth={2.5} fill="none" />
    </Svg>
  );
}

/** Photo / picture frame (Permission_Request card). Geometry from the design handoff. */
export function PhotoIcon({ size = 22, color = colors.brand }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        x={3.5}
        y={3.5}
        width={17}
        height={17}
        rx={3}
        stroke={color}
        strokeWidth={2.5}
        fill="none"
      />
      <Circle cx={9} cy={9} r={1.4} fill={color} />
      <Path
        d="M4.5 17 L 9.5 12 L 13 15.5 L 15.5 13 L 19.5 17"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Location pin (Permission_Request card). Geometry from the design handoff. */
export function PinIcon({ size = 22, color = colors.brand }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 21 C 12 21 5 15.4 5 10 A 7 7 0 0 1 19 10 C 19 15.4 12 21 12 21 Z"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={10} r={2.6} stroke={color} strokeWidth={2.5} fill="none" />
    </Svg>
  );
}

/** Shield-check (Permission_Request data notice). Geometry from the design handoff. */
export function ShieldCheckIcon({ size = 16, color = colors.info }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 3 L 19.5 6.2 V 11 C 19.5 16 16.4 19.6 12 21 C 7.6 19.6 4.5 16 4.5 11 V 6.2 Z"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 11.8 L 11.2 14 L 15.2 9.8"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Provider brand marks ──────────────────────────────────────────────

export function KakaoLogo({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 3C6.48 3 2 6.54 2 10.9c0 2.8 1.86 5.26 4.66 6.65-.15.52-.96 3.33-.99 3.55 0 0-.02.17.09.23.11.06.24.01.24.01.32-.04 3.65-2.39 4.23-2.8.57.08 1.16.12 1.77.12 5.52 0 10-3.54 10-7.9S17.52 3 12 3z"
        fill="rgba(0,0,0,.9)"
      />
    </Svg>
  );
}

export function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <Path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <Path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <Path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </Svg>
  );
}

export function AppleLogo({ size = 17 }: { size?: number }) {
  return (
    <Svg width={size} height={(size / 17) * 20} viewBox="0 0 17 20">
      <Path
        fill="#fff"
        d="M14.13 10.62c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.04 1.52-.71 2.85-.71s1.71.71 2.88.69c1.19-.02 1.94-1.08 2.67-2.15.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.54zM11.93 3.87c.61-.74 1.02-1.77.9-2.79-.87.04-1.93.58-2.56 1.32-.56.65-1.06 1.7-.92 2.7.97.08 1.97-.5 2.58-1.23z"
      />
    </Svg>
  );
}

/** Tide curve used on carousel slide 1. */
export function TideChart() {
  return (
    <Svg width="100%" height={80} viewBox="0 0 256 80">
      <Line
        x1={6}
        y1={52}
        x2={250}
        y2={52}
        stroke={colors.chartGrid}
        strokeWidth={2}
        strokeDasharray="1 7"
        strokeLinecap="round"
      />
      <Path
        d="M6 66 C34 14 68 14 94 42 C120 70 154 70 180 38 C200 16 232 18 250 32"
        stroke={colors.chartLine}
        strokeWidth={4.5}
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx={94} cy={42} r={7.5} fill={colors.accent} stroke="#fff" strokeWidth={3} />
    </Svg>
  );
}
