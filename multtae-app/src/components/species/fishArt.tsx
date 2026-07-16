/**
 * 어종 도감 카드용 어종 일러스트 + 등급 육각 프레임.
 * `Main_FishSpecies_List_v9_DSv2.html`의 `.fish-asset` SVG를 path 그대로 포팅.
 *
 * 미수집(silhouette) 상태는 프로토타입의 `filter:brightness(0); opacity:.16`을
 * "모든 fill을 검정으로 + 전체 opacity 0.16"으로 재현한다.
 */
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Stop } from 'react-native-svg';
import { ds2Colors } from '../../theme/ds2';

export type FishArtId =
  | 'flatfish'
  | 'rockfish'
  | 'seabream'
  | 'seabass'
  | 'cuttlefish'
  | 'mullet'
  | 'mackerel'
  | 'grouper'
  | 'puffer';

interface FishArtProps {
  id: FishArtId;
  silhouette?: boolean;
  /** CSS `.fish-asset`은 100×92 고정. */
  width?: number;
  height?: number;
}

export function FishArt({ id, silhouette = false, width = 100, height = 92 }: FishArtProps) {
  // 실루엣이면 원색 대신 검정 fill.
  const f = (color: string) => (silhouette ? '#000000' : color);
  const spec = FISH_SPECS[id];

  return (
    <Svg
      width={width}
      height={height}
      viewBox={spec.viewBox}
      opacity={silhouette ? 0.16 : 1}
      // preserveAspectRatio 기본값(xMidYMid meet)이 CSS와 동일
    >
      {spec.render(f)}
    </Svg>
  );
}

type FillFn = (color: string) => string;

const FISH_SPECS: Record<FishArtId, { viewBox: string; render: (f: FillFn) => React.ReactNode }> = {
  // 광어 (flounder)
  flatfish: {
    viewBox: '0 0 96 96',
    render: (f) => (
      <G transform="translate(14 18) scale(0.7)">
        <Path
          d="M 12 49 C 13 39 18 31 27 27 C 40 22.5 57 23.5 70 28.5 C 73 30.5 74.5 32 76 34 C 77 40 77 58 76 64 C 74.5 66 73 67.5 70 69.5 C 57 74.5 40 75.5 27 71 C 18 67 13 59 12 49 Z"
          fill={f('#6E5A3C')}
        />
        <Circle cx={23} cy={41} r={4.2} fill={f('#1E1913')} />
        <Circle cx={32} cy={38.5} r={3.8} fill={f('#1E1913')} />
      </G>
    ),
  },
  // 우럭 (rockfish)
  rockfish: {
    viewBox: '0 0 96 96',
    render: (f) => (
      <>
        <Path
          d="M 13 46 C 16 36 23.5 31.5 34 31 C 47 30.6 58 31.5 68 36.8 L 85 30.5 Q 78.5 47 85 63 L 68 56.2 C 58 66 45 68.2 34 66 C 23 63.5 16 55.5 13 46 Z"
          fill={f('#0077FF')}
        />
        <Circle cx={24} cy={40} r={5.4} fill={f('#E3E9F9')} />
      </>
    ),
  },
  // 참돔·감성돔 (seabream — 프로토타입에서 동일 실루엣 공유)
  seabream: {
    viewBox: '0 0 96 96',
    render: (f) => (
      <>
        <Path
          d="M 12.5 46 C 14 33 26 23.5 42 23.5 C 55 23.5 65 30 68.5 40 L 70 43.5 L 86.5 30 L 78 48 L 86.5 66 L 70 52.5 L 68.5 55.5 C 65 66 55 72.5 42 72.5 C 26 72.5 14 62 12.5 46 Z"
          fill={f('#0077FF')}
        />
        <Circle cx={24} cy={38} r={4.8} fill={f('#E3E9F9')} />
      </>
    ),
  },
  // 농어 (seabass)
  seabass: {
    viewBox: '250 225 750 390',
    render: (f) => (
      <G transform="translate(360,300) scale(5)">
        <Path
          d="M11 48 C16 35 30 26 45 26 C58 26 68 33 73 44 C74 46 74 50 73 52 C68 63 58 70 45 70 C30 70 16 61 11 48 Z"
          fill={f('#2C608C')}
        />
        <Path
          d="M73 46 C77 47 79 47 80 48 L92 33 C86 42 86 54 92 63 L80 48 C79 49 77 49 73 50 Z"
          fill={f('#2C608C')}
        />
        <Path d="M35 27 L41 14 L50 28 Z" fill={f('#22506F')} />
        <Path
          d="M11 48 C16 35 30 26 45 26 C58 26 68 33 73 44 C55 39 28 40 11 48 Z"
          fill={f('#1B3A5B')}
          fillOpacity={0.55}
        />
        <Circle cx={19} cy={45} r={3} fill={f('#10202E')} />
      </G>
    ),
  },
  // 갑오징어 (cuttlefish)
  cuttlefish: {
    viewBox: '0 0 96 96',
    render: (f) => (
      <>
        <Path
          d="M 17 30 C 17 16 24 10 33 10 C 42 10 49 16 49 30 C 56 33 62 39 65 48 Q 66 53 61 52 Q 58 51 56 46 Q 58 54 54 59 Q 50 59 49 52 Q 48 49 47 47 Q 47 56 43 60 Q 39 59 39 51 Q 38 48 37 46 Q 36 56 32 60 Q 28 59 29 50 Q 28 47 28 45 Q 26 55 22 58 Q 18 57 20 49 Q 21 46 22 44 Q 17 51 13 51 Q 10 50 13 44 Q 15 40 20 38 C 17 36 17 33 17 30 Z"
          fill={f('#0077FF')}
        />
        <Circle cx={24} cy={37} r={4.6} fill={f('#E3E9F9')} />
      </>
    ),
  },
  // 숭어 (mullet)
  mullet: {
    viewBox: '250 225 750 390',
    render: (f) => (
      <G transform="translate(340 300) scale(5.4)">
        <Path
          d="M 9 46 C 9 40 13 37 20 35.5 C 33 32.8 52 32.8 68 34.5 C 73 35.3 77 37.5 79 41 L 90 35 Q 85 48 90 61 L 79 55 C 77 58.5 73 60.7 68 61.5 C 52 63.5 33 63.5 20 60.5 C 13 59 9 56 9 50 Z"
          fill={f('#7C8896')}
        />
        <Path d="M 34 34 L 39 25.5 L 46 33 Z" fill={f('#8A96A4')} />
        <Path d="M 54 34 L 59 26.5 L 65 33.5 Z" fill={f('#8A96A4')} />
        <Circle cx={18} cy={43.5} r={3.3} fill={f('#1E1913')} />
      </G>
    ),
  },
  // 고등어 (mackerel)
  mackerel: {
    viewBox: '250 225 750 390',
    render: (f) => (
      <G transform="translate(360,300) scale(5)">
        <Path
          d="M15 48 C17 40 24 36 36 36 C51 36 65 41 73 48 C65 55 51 58 36 58 C24 58 17 56 15 48 Z"
          fill={f('#CDBE84')}
        />
        <Path d="M72 48 C79 44 85 45 87 48 C85 51 79 52 72 49 Z" fill={f('#C2B274')} />
        <Path d="M40 37 L47 31 L53 38 Z" fill={f('#C2B274')} />
        <Path
          d="M15 48 C17 40 24 36 36 36 C51 36 65 41 73 48 C52 44 30 44 16 48 Z"
          fill={f('#AE9E5C')}
          fillOpacity={0.5}
        />
        <Circle cx={24} cy={45} r={2.6} fill={f('#2A2620')} />
      </G>
    ),
  },
  // 자바리 (longtooth grouper)
  grouper: {
    viewBox: '0 0 96 96',
    render: (f) => (
      <>
        <Path
          d="M 8 51 C 9 44 13 38 22 34 C 33 29 47 28 61 32 C 68 34 73 37 77 41 C 84 37 89 37 91 36 C 93 46 93 55 91 65 C 88 64 82 58 77 53 C 73 57 67 60 59 62 C 45 65 30 64 20 60 C 13 57 9 55 8 51 Z"
          fill={f('#83704F')}
        />
        <Ellipse cx={48} cy={46} rx={7} ry={6} fill={f('#4B3D28')} />
        <Ellipse cx={62} cy={42} rx={6} ry={5.5} fill={f('#4B3D28')} />
        <Circle cx={22} cy={43} r={4.6} fill={f('#2C2417')} />
        <Circle cx={20.5} cy={41.5} r={1.6} fill={f('#F5F3ED')} />
      </>
    ),
  },
  // 복어 (puffer)
  puffer: {
    viewBox: '0 0 96 96',
    render: (f) => (
      <>
        <Path
          d="M 12 50 C 12 38 22 29 38 28 C 54 27 68 34 74 46 C 75 48 75 52 74 54 C 68 66 54 73 38 72 C 22 71 12 62 12 50 Z"
          fill={f('#7E8C94')}
        />
        <Path
          d="M 73 45 C 80 43 86 44 91 47 C 88 49 88 51 91 53 C 86 56 80 57 73 55 C 75 52 75 48 73 45 Z"
          fill={f('#6E7A82')}
        />
        <Circle cx={36} cy={41} r={2.4} fill={f('#333B40')} />
        <Circle cx={48} cy={39} r={2.1} fill={f('#333B40')} />
        <Circle cx={26} cy={43} r={4} fill={f('#2A3034')} />
        <Circle cx={24.5} cy={41.5} r={1.5} fill={f('#F5F3ED')} />
      </>
    ),
  },
};

/**
 * 레어/유니크 등급 육각 뱃지 프레임 (`.grade-shape`).
 * 그라데이션 채움 + 3px 스트로크. (CSS drop-shadow 글로우는 RN SVG 필터
 * 제약으로 생략 — 스트로크·그라데이션이 등급 구분을 담당한다.)
 */
export function GradeShape({ grade }: { grade: 'rare' | 'unique' }) {
  const gradient = grade === 'rare' ? ds2Colors.rareGradient : ds2Colors.uniqueGradient;
  const stroke = grade === 'rare' ? ds2Colors.rareStroke : ds2Colors.uniqueStroke;
  const gradId = `grade-${grade}`;

  return (
    <Svg width={118} height={96} viewBox="0 0 120 98">
      <Defs>
        <LinearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={gradient[0]} />
          <Stop offset="0.45" stopColor={gradient[1]} />
          <Stop offset="1" stopColor={gradient[2]} />
        </LinearGradient>
      </Defs>
      <Path
        d="M32 4H88Q94 4 98 10L115 40Q118 49 115 58L98 88Q94 94 88 94H32Q26 94 22 88L5 58Q2 49 5 40L22 10Q26 4 32 4Z"
        fill={`url(#${gradId})`}
        stroke={stroke}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
