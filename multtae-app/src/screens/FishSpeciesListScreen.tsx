/**
 * Main_FishSpecies_List (어종 도감) — v9 DS v2 "클린 화이트" 확정본 구현.
 * 시각 명세: Claude Design 핸드오프 `Main_FishSpecies_List_v9_DSv2.html`.
 *
 * 구성: 고정 topbar → 스크롤(수집 현황 summary · 뱃지 요약 · sticky 검색/필터
 * 툴바 · 리스트 헤드 · 2열 어종 그리드) → 5탭 GNB. 검색·필터·정렬·빈 결과
 * 동작은 프로토타입 스크립트와 1:1로 맞췄다.
 */
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ds2Colors as c, ds2Radii, ds2Shadows, ds2Text } from '../theme/ds2';
import { BADGE_SUMMARY, COLLECTION_SUMMARY, SPECIES, type Species } from '../data/species';
import { BadgeSummaryButton, CollectionSummaryCard } from '../components/species/SummarySection';
import { ReportCard, SpeciesCard } from '../components/species/SpeciesCard';
import { FILTER_LABELS, FilterSheet, type FilterKey } from '../components/species/FilterSheet';
import { SortMenu, type SortKey } from '../components/species/SortMenu';
import { Gnb, type GnbTab } from '../components/species/Gnb';
import {
  ClearSearchIcon,
  EmptyResultIcon,
  FilterIcon,
  HelpIcon,
  SearchIcon,
} from '../components/species/icons';

/** 검색 정규화 — 프로토타입 normalize()와 동일 (trim + lower + 공백 제거). */
function normalize(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, '');
}

/** 그리드 아이템 — 어종 카드 + 항상 목록 끝의 "기타 어종 제보" 카드. */
type GridItem =
  | { kind: 'species'; species: Species }
  | { kind: 'report' };

/** 제보 카드의 정렬/필터 키 (프로토타입 data-* 그대로). */
const REPORT_META = { name: '기타 어종 제보', recent: 1000, rank: 999 } as const;

const STATE_KEYS: FilterKey[] = ['collected', 'uncollected'];
const CATEGORY_KEYS: FilterKey[] = ['fish', 'cephalopod'];

export function FishSpeciesListScreen({
  onPressTab,
}: {
  /** GNB 탭 콜백 — 도감 외 탭 화면은 아직 미구현이라 상위에서 처리한다. */
  onPressTab?: (tab: GnbTab) => void;
}) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('recent');
  const [sheetOpen, setSheetOpen] = useState(false);
  // 시트 체크 상태와 적용된 필터를 분리 — "적용하기"를 눌러야 반영 (프로토타입 동작).
  const [checked, setChecked] = useState<FilterKey[]>([]);
  const [applied, setApplied] = useState<FilterKey[]>([]);

  const visibleItems = useMemo<GridItem[]>(() => {
    const q = normalize(query);
    const states = applied.filter((k) => STATE_KEYS.includes(k));
    const categories = applied.filter((k) => CATEGORY_KEYS.includes(k));
    const hideClosed = applied.includes('hideClosed');

    const items: { item: GridItem; name: string; recent: number; rank: number }[] = [];
    for (const species of SPECIES) {
      const nameMatch = !q || normalize(species.searchName).includes(q);
      const stateMatch = !states.length || states.includes(species.state as FilterKey);
      const categoryMatch = !categories.length || categories.includes(species.category);
      const closedMatch = !hideClosed || !species.closedSeason;
      if (nameMatch && stateMatch && categoryMatch && closedMatch) {
        items.push({
          item: { kind: 'species', species },
          name: species.searchName,
          recent: species.recent,
          rank: species.rank,
        });
      }
    }
    // 제보 카드도 같은 규칙으로 필터/정렬에 참여한다 (state=report, category=etc).
    const reportMatches =
      (!q || normalize(REPORT_META.name).includes(q)) && !states.length && !categories.length;
    if (reportMatches) {
      items.push({ item: { kind: 'report' }, ...REPORT_META });
    }

    items.sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name, 'ko');
      if (sortKey === 'rank') return a.rank - b.rank;
      return a.recent - b.recent;
    });
    return items.map((x) => x.item);
  }, [query, applied, sortKey]);

  const removeAppliedFilter = (key: FilterKey) => {
    setApplied((prev) => prev.filter((k) => k !== key));
    setChecked((prev) => prev.filter((k) => k !== key));
  };

  const resetAllFilters = () => {
    setApplied([]);
    setChecked([]);
  };

  const toggleChecked = (key: FilterKey) =>
    setChecked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  // 2열 그리드 — 홀수 개면 마지막 칸은 빈 스페이서로 채운다.
  const rows = useMemo(() => {
    const out: GridItem[][] = [];
    for (let i = 0; i < visibleItems.length; i += 2) out.push(visibleItems.slice(i, i + 2));
    return out;
  }, [visibleItems]);

  return (
    <View style={styles.root}>
      {/* Topbar */}
      <View style={[styles.topbar, { paddingTop: insets.top + 8, height: insets.top + 72 }]}>
        <View>
          <Text accessibilityRole="header" style={styles.title}>
            어종 도감
          </Text>
          <Text style={styles.subtitle}>잡은 어종과 기록을 한눈에</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="도감 도움말"
          style={({ pressed }) => [styles.headerAction, pressed && { backgroundColor: c.pressed }]}
        >
          <HelpIcon />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
      >
        <CollectionSummaryCard summary={COLLECTION_SUMMARY} />
        <BadgeSummaryButton badges={BADGE_SUMMARY} />

        {/* Sticky 검색/필터 툴바 */}
        <View style={styles.tools}>
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <View style={styles.searchIcon} pointerEvents="none">
                <SearchIcon />
              </View>
              <TextInput
                accessibilityLabel="어종 검색"
                value={query}
                onChangeText={setQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="어종 이름이나 별칭 검색"
                placeholderTextColor={c.muted}
                returnKeyType="search"
                style={[styles.searchInput, searchFocused && styles.searchInputFocused]}
              />
              {query.length > 0 ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="검색어 지우기"
                  onPress={() => setQuery('')}
                  style={styles.clearSearch}
                >
                  <ClearSearchIcon />
                </Pressable>
              ) : null}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="필터 열기"
              onPress={() => setSheetOpen(true)}
              style={({ pressed }) => [styles.filterBtn, pressed && { backgroundColor: c.pressed }]}
            >
              <FilterIcon />
              {applied.length > 0 ? (
                <View style={styles.filterDot}>
                  <Text style={styles.filterDotLabel}>{applied.length}</Text>
                </View>
              ) : null}
            </Pressable>
          </View>

          {applied.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.activeFilters}
              contentContainerStyle={styles.activeFiltersContent}
            >
              {applied.map((key) => (
                <Pressable
                  key={key}
                  accessibilityRole="button"
                  accessibilityLabel={`${FILTER_LABELS[key]} 필터 해제`}
                  onPress={() => removeAppliedFilter(key)}
                  style={styles.filterChip}
                >
                  <Text style={styles.filterChipLabel}>{FILTER_LABELS[key]} ×</Text>
                </Pressable>
              ))}
              <Pressable accessibilityRole="button" onPress={resetAllFilters} style={styles.resetChip}>
                <Text style={styles.resetChipLabel}>전체 초기화</Text>
              </Pressable>
            </ScrollView>
          ) : null}
        </View>

        {/* 리스트 헤드 */}
        <View style={styles.listHead}>
          <Text style={styles.listTitle}>
            전체 어종 <Text style={styles.listCount}>{visibleItems.length}개 예시</Text>
          </Text>
          <SortMenu value={sortKey} onChange={setSortKey} />
        </View>

        {/* 어종 그리드 */}
        {visibleItems.length === 0 ? (
          <View style={styles.emptyResult}>
            <EmptyResultIcon />
            <Text style={styles.emptyTitle}>조건에 맞는 어종이 없어요</Text>
            <Text style={styles.emptySub}>검색어나 필터를 다시 확인해주세요</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {rows.map((row, i) => (
              <View key={i} style={styles.gridRow}>
                {row.map((item) =>
                  item.kind === 'species' ? (
                    <View key={item.species.id} style={styles.gridCell}>
                      <SpeciesCard species={item.species} />
                    </View>
                  ) : (
                    <View key="report" style={styles.gridCell}>
                      <ReportCard />
                    </View>
                  ),
                )}
                {row.length === 1 ? <View style={styles.gridCell} /> : null}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Gnb active="encyclopedia" bottomInset={insets.bottom} onPressTab={onPressTab} />

      <FilterSheet
        visible={sheetOpen}
        checked={checked}
        onToggle={toggleChecked}
        onReset={() => setChecked([])}
        onApply={() => {
          setApplied(checked);
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </View>
  );
}

const SIDE = 20; // 화면 좌우 고정 마진

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.canvas },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIDE,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  title: { ...ds2Text('bold', 22, 28, -0.5), color: c.ink },
  subtitle: { marginTop: 1, ...ds2Text('regular', 13, 19), color: c.muted },
  headerAction: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: c.borderStrong,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.canvas,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingTop: 16, paddingHorizontal: SIDE, paddingBottom: 32 },

  tools: {
    marginTop: 14,
    marginHorizontal: -SIDE,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: SIDE,
    backgroundColor: c.canvas,
  },
  searchRow: { flexDirection: 'row', gap: 8 },
  searchBox: { flex: 1, height: 48 },
  searchIcon: { position: 'absolute', zIndex: 2, left: 17, top: 14 },
  searchInput: {
    flex: 1,
    height: 48,
    paddingLeft: 44,
    paddingRight: 42,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: c.borderStrong,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.canvas,
    color: c.ink,
    ...ds2Text('medium', 14, 20),
    ...ds2Shadows.input,
  },
  searchInputFocused: { borderColor: c.brand },
  clearSearch: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: c.borderStrong,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.canvas,
  },
  filterDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    minWidth: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: c.white,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.brand,
  },
  filterDotLabel: { ...ds2Text('bold', 11, 15), color: c.white },
  activeFilters: { marginTop: 10 },
  activeFiltersContent: { alignItems: 'center', gap: 8, paddingBottom: 1 },
  filterChip: {
    minHeight: 34,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.tint,
  },
  filterChipLabel: { ...ds2Text('medium', 13, 19), color: c.ink },
  resetChip: { minHeight: 34, justifyContent: 'center', paddingHorizontal: 6 },
  resetChipLabel: {
    ...ds2Text('medium', 13, 19),
    color: c.body,
    textDecorationLine: 'underline',
  },

  listHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 12,
  },
  listTitle: { ...ds2Text('semibold', 16, 23, -0.2), color: c.ink },
  listCount: { ...ds2Text('medium', 14, 20), color: c.muted },

  grid: { gap: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },
  gridCell: { flex: 1 },

  emptyResult: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: c.borderStrong,
    borderRadius: ds2Radii.panel,
    backgroundColor: c.canvas,
  },
  emptyTitle: { marginTop: 12, ...ds2Text('semibold', 16, 23), color: c.ink },
  emptySub: { marginTop: 4, ...ds2Text('regular', 13, 20), color: c.muted },
});
