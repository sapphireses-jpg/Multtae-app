/**
 * 어종 도감 화면 전용 라인 아이콘 — v9 프로토타입 SVG를 그대로 포팅.
 * 시스템 규칙: stroke 2.2~2.7, round cap/join, 단색(color prop).
 */
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { ds2Colors } from '../../theme/ds2';

type IconProps = { size?: number; color?: string };

/** 도감 도움말 (topbar). */
export function HelpIcon({ size = 23, color = ds2Colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2.2} />
      <Path
        d="M9.8 9.1a2.4 2.4 0 0 1 4.6.9c0 1.8-2.4 2-2.4 3.7"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={17.1} r={1.2} fill={color} />
    </Svg>
  );
}

/** 수집 뱃지 트로피. */
export function TrophyIcon({ size = 24, color = ds2Colors.brand }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M8 4h12v5c0 5-2.5 8-6 9.5C10.5 17 8 14 8 9V4Z"
        stroke={color}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <Path
        d="M8 7H4v2c0 3 2 5 5.5 5M20 7h4v2c0 3-2 5-5.5 5M14 18.5V23M10 24h8"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** 뱃지 요약 우측 셰브론. */
export function ChevronRightIcon({ size = 21, color = ds2Colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M8 5.5 13.5 11 8 16.5"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** 어종 카드 우하단 셰브론 (18×18, stroke 2.5). */
export function CardChevronIcon({ size = 18, color = ds2Colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5.5 15.5 12 9 18.5"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** 검색 돋보기. */
export function SearchIcon({ size = 21, color = ds2Colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Circle cx={9.2} cy={9.2} r={6.2} stroke={color} strokeWidth={2.3} />
      <Path d="m13.9 13.9 4.5 4.5" stroke={color} strokeWidth={2.3} strokeLinecap="round" />
    </Svg>
  );
}

/** 검색어 지우기 (회색 원 + ×). */
export function ClearSearchIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={8} fill="#e8edf3" />
      <Path d="m7 7 6 6m0-6-6 6" stroke="#657184" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/** 필터 (3단 라인). */
export function FilterIcon({ size = 23, color = ds2Colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7h16M7 12h10M10 17h4" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

/** 정렬 pill의 ▾ (프로토타입은 select 배경 이미지). */
export function SortChevronIcon({ size = 14, color = ds2Colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4 6l4 4 4-4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** 기타 어종 제보 / 등록 FAB의 +. */
export function PlusIcon({ size = 25, color = ds2Colors.ink, strokeWidth = 2.6 }: IconProps & { strokeWidth?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path d="M12.5 4.5v16m-8-8h16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

/** 필터 시트 닫기 ×. */
export function SheetCloseIcon({ size = 23, color = ds2Colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none">
      <Path d="m6 6 11 11M17 6 6 17" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

/** 빈 결과 일러스트 (66×66). */
export function EmptyResultIcon({ size = 66 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 66 66" fill="none">
      <Rect x={7} y={7} width={52} height={52} rx={18} fill="#fff" stroke="#dce5ef" strokeWidth={2} />
      <Path
        d="M21 34c8-8 18-8 27 0M21 34l-7-5v10l7-5Z"
        stroke="#6f7c8e"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={39} cy={31} r={2} fill="#6f7c8e" />
    </Svg>
  );
}

// ── GNB 탭 아이콘 (23×23, stroke 2.5) ────────────────────────────────

export function TabHomeIcon({ size = 23, color = ds2Colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m4 11 8-7 8 7v8.5h-5.5V14h-5v5.5H4V11Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabBookIcon({ size = 23, color = ds2Colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 5a2.5 2.5 0 0 1 2.5-2.5H19v16H7.5A2.5 2.5 0 0 0 5 21V5Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Path d="M5 18.5A2.5 2.5 0 0 1 7.5 16H19" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
    </Svg>
  );
}

export function TabFeedIcon({ size = 23, color = ds2Colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 5.5h14v10H9l-4 3v-13Z" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
      <Path d="M8.5 9h7M8.5 12h4.5" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function TabProfileIcon({ size = 23, color = ds2Colors.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={3.8} stroke={color} strokeWidth={2.5} />
      <Path
        d="M4.5 20c1-4.5 4-6.5 7.5-6.5s6.5 2 7.5 6.5"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
