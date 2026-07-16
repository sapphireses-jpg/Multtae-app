/**
 * Main_FishSpecies_List (어종 도감) — data model + the sample dataset carried
 * over from the v9 prototype. Real data will come from Supabase later; the
 * shapes below mirror the prototype's `data-*` attributes so the filter/sort
 * behavior ports 1:1.
 */
import type { FishArtId } from '../components/species/fishArt';

export type SpeciesGrade = 'common' | 'rare' | 'unique';
export type SpeciesCategory = 'fish' | 'cephalopod';
export type SpeciesState = 'collected' | 'uncollected';

export interface Species {
  id: string;
  /** 표시 이름. 미수집 카드는 "???"로 마스킹되므로 검색용 이름과 분리한다. */
  displayName: string;
  /** 검색 대상 이름 (프로토타입 data-name). */
  searchName: string;
  grade: SpeciesGrade;
  category: SpeciesCategory;
  state: SpeciesState;
  /** 최근 잡은 순 정렬 키 (작을수록 최근). */
  recent: number;
  /** 랭킹 순 정렬 키. 999 = 랭킹 없음. */
  rank: number;
  /** 이름 행 pill 라벨 (전국 12위 · 공식 기록 등). */
  statusLabel?: string;
  /** 금어기 여부 — 아이콘 스테이지 좌상단 플래그. */
  closedSeason?: boolean;
  /** 최고기록 표시값 (58cm · 1.2kg). 미수집이면 없음. */
  bestRecord?: string;
  /** 신기록 코랄 마이크로 pill. */
  newRecord?: boolean;
  art: FishArtId;
}

export const SPECIES: Species[] = [
  {
    id: 'flatfish',
    displayName: '광어',
    searchName: '광어',
    grade: 'common',
    category: 'fish',
    state: 'collected',
    recent: 1,
    rank: 999,
    bestRecord: '58cm',
    newRecord: true,
    art: 'flatfish',
  },
  {
    id: 'rockfish',
    displayName: '우럭',
    searchName: '우럭',
    grade: 'common',
    category: 'fish',
    state: 'collected',
    recent: 2,
    rank: 999,
    bestRecord: '32cm',
    art: 'rockfish',
  },
  {
    id: 'red-seabream',
    displayName: '참돔',
    searchName: '참돔',
    grade: 'rare',
    category: 'fish',
    state: 'collected',
    recent: 3,
    rank: 12,
    statusLabel: '전국 12위',
    bestRecord: '45cm',
    art: 'seabream',
  },
  {
    id: 'black-seabream',
    displayName: '감성돔',
    searchName: '감성돔',
    grade: 'common',
    category: 'fish',
    state: 'collected',
    recent: 4,
    rank: 999,
    statusLabel: '전국 27위',
    closedSeason: true,
    bestRecord: '41cm',
    art: 'seabream',
  },
  {
    id: 'seabass',
    displayName: '농어',
    searchName: '농어',
    grade: 'common',
    category: 'fish',
    state: 'collected',
    recent: 5,
    rank: 999,
    bestRecord: '72cm',
    art: 'seabass',
  },
  {
    id: 'cuttlefish',
    displayName: '갑오징어',
    searchName: '갑오징어',
    grade: 'common',
    category: 'cephalopod',
    state: 'collected',
    recent: 6,
    rank: 999,
    bestRecord: '1.2kg',
    art: 'cuttlefish',
  },
  {
    id: 'mullet',
    displayName: '숭어',
    searchName: '숭어',
    grade: 'common',
    category: 'fish',
    state: 'collected',
    recent: 7,
    rank: 999,
    bestRecord: '61cm',
    art: 'mullet',
  },
  {
    id: 'mackerel',
    displayName: '고등어',
    searchName: '고등어',
    grade: 'common',
    category: 'fish',
    state: 'collected',
    recent: 8,
    rank: 999,
    bestRecord: '36cm',
    art: 'mackerel',
  },
  {
    id: 'longtooth-grouper',
    displayName: '자바리',
    searchName: '자바리',
    grade: 'unique',
    category: 'fish',
    state: 'collected',
    recent: 9,
    rank: 999,
    statusLabel: '공식 기록',
    bestRecord: '83cm',
    art: 'grouper',
  },
  {
    id: 'puffer',
    displayName: '복어',
    searchName: '복어',
    grade: 'rare',
    category: 'fish',
    state: 'collected',
    recent: 10,
    rank: 999,
    bestRecord: '1.8kg',
    art: 'puffer',
  },
  {
    id: 'locked-fish',
    displayName: '???',
    searchName: '미수집 어종',
    grade: 'common',
    category: 'fish',
    state: 'uncollected',
    recent: 98,
    rank: 999,
    art: 'flatfish',
  },
  {
    id: 'locked-cephalopod',
    displayName: '???',
    searchName: '미수집 두족류',
    grade: 'common',
    category: 'cephalopod',
    state: 'uncollected',
    recent: 99,
    rank: 999,
    art: 'cuttlefish',
  },
];

/** 도감 수집 현황 요약 (프로토타입 예시 값). */
export const COLLECTION_SUMMARY = {
  percent: 12,
  collected: 10,
  total: 81,
  totalCatch: '38마리',
  tripCount: '12회',
  avgPerTrip: '3.2마리',
  recentTripDate: '07.05',
} as const;

/** 수집 뱃지 요약 (프로토타입 예시 값). */
export const BADGE_SUMMARY = {
  count: 4,
  latest: '돔 마스터',
  latestIsNew: true,
  moreCount: 3,
} as const;
