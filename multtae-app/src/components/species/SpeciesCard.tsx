/**
 * 어종 카드 (`.species-card-v4`) — 수집/레어/유니크/미수집 변형 + 기타 어종
 * 제보 카드. 카드 위계: 등급 텍스트(20) → 이름 행(32) → 아이콘 스테이지(122)
 * → 최고기록 행. 레어·유니크는 육각 뱃지 프레임, 미수집은 대시 보더 +
 * 실루엣 + "기록 없음".
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ds2Colors as c, ds2Radii, ds2Text } from '../../theme/ds2';
import type { Species } from '../../data/species';
import { FishArt, GradeShape } from './fishArt';
import { CardChevronIcon, PlusIcon } from './icons';

const GRADE_LABEL: Record<Species['grade'], string> = {
  common: '일반',
  rare: '레어',
  unique: '유니크',
};

export function SpeciesCard({ species, onPress }: { species: Species; onPress?: () => void }) {
  const locked = species.state === 'uncollected';
  const grade = species.grade;

  const gradeColor = locked
    ? c.disabled
    : grade === 'rare'
      ? c.brandActive
      : grade === 'unique'
        ? c.warning
        : c.muted;

  const stageBg = locked
    ? c.canvas
    : grade === 'rare'
      ? c.rareStageBg
      : grade === 'unique'
        ? c.uniqueStageBg
        : c.tint;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={locked ? `미수집 어종` : `${species.displayName} 상세 보기`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        locked && styles.cardLocked,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={[styles.gradeText, { color: gradeColor }]}>
        {locked ? '미수집' : GRADE_LABEL[grade]}
      </Text>

      <View style={styles.titleRow}>
        <Text
          numberOfLines={1}
          style={[styles.titleName, locked && { color: c.disabled }]}
        >
          {species.displayName}
        </Text>
        {species.statusLabel ? (
          <View style={styles.statusPill}>
            <Text numberOfLines={1} style={styles.statusPillLabel}>
              {species.statusLabel}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.iconStage, { backgroundColor: stageBg }]}>
        {species.closedSeason ? (
          <View style={styles.stageFlag}>
            <Text style={styles.stageFlagLabel}>금어기</Text>
          </View>
        ) : null}
        {!locked && (grade === 'rare' || grade === 'unique') ? (
          <View style={styles.gradeShape}>
            <GradeShape grade={grade} />
          </View>
        ) : null}
        {!locked && grade === 'unique' ? <View style={styles.uniqueMarker} /> : null}
        <FishArt id={species.art} silhouette={locked} />
      </View>

      <View style={styles.bestRecordRow}>
        {locked ? (
          <Text style={styles.noRecord}>기록 없음</Text>
        ) : (
          <View style={styles.bestRecord}>
            <Text style={styles.bestRecordLabel}>최고기록</Text>
            <Text numberOfLines={1} style={styles.bestRecordValue}>
              {species.bestRecord}
            </Text>
            {species.newRecord ? (
              <View style={styles.newRecordPill}>
                <Text style={styles.newRecordLabel}>신기록</Text>
              </View>
            ) : null}
          </View>
        )}
        <View style={styles.cardChevron}>
          <CardChevronIcon />
        </View>
      </View>
    </Pressable>
  );
}

/** 기타 어종 제보 카드 (`.report-card`). */
export function ReportCard({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="기타 어종 제보"
      onPress={onPress}
      style={({ pressed }) => [styles.reportCard, pressed && styles.cardPressed]}
    >
      <View style={styles.reportIcon}>
        <PlusIcon size={25} color={c.ink} />
      </View>
      <Text style={styles.reportTitle}>기타 어종 제보</Text>
      <Text style={styles.reportSub}>도감에 없는 어종을 알려주세요</Text>
    </Pressable>
  );
}

/** 카드 고정 높이 — grid rows 20 + 32 + (114 + 4×2) + 48 + padding 12×2. */
const CARD_HEIGHT = 20 + 32 + 122 + 48 + 24;

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    padding: 12,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: ds2Radii.card,
    backgroundColor: c.canvas,
    overflow: 'hidden',
  },
  cardLocked: {
    borderStyle: 'dashed',
    borderColor: c.borderStrong,
    backgroundColor: c.pressed,
  },
  cardPressed: { backgroundColor: c.pressed, transform: [{ scale: 0.98 }] },

  gradeText: { height: 20, ...ds2Text('medium', 12, 18) },

  titleRow: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  titleName: { flexShrink: 1, ...ds2Text('semibold', 16, 23, -0.2), color: c.ink },
  statusPill: {
    maxWidth: 86,
    minHeight: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.tint,
  },
  statusPillLabel: { ...ds2Text('semibold', 11, 16), color: c.ink },

  iconStage: {
    height: 114,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ds2Radii.stage,
  },
  stageFlag: {
    position: 'absolute',
    zIndex: 5,
    top: 8,
    left: 8,
    minHeight: 24,
    justifyContent: 'center',
    paddingHorizontal: 9,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.warningBg,
  },
  stageFlagLabel: { ...ds2Text('semibold', 11, 16), color: c.warning },
  gradeShape: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  uniqueMarker: {
    position: 'absolute',
    zIndex: 4,
    top: 5,
    width: 13,
    height: 13,
    transform: [{ rotate: '45deg' }],
    borderWidth: 2,
    borderColor: c.canvas,
    borderRadius: 3,
    backgroundColor: c.uniqueMarker,
  },

  bestRecordRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  bestRecord: { flexShrink: 1, flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  bestRecordLabel: { ...ds2Text('regular', 12, 17), color: c.muted },
  bestRecordValue: { ...ds2Text('semibold', 16, 23, -0.2), color: c.ink },
  noRecord: { ...ds2Text('medium', 13, 19), color: c.disabled },
  newRecordPill: {
    minHeight: 20,
    justifyContent: 'center',
    paddingHorizontal: 7,
    marginLeft: 2,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.accentTint,
  },
  newRecordLabel: { ...ds2Text('bold', 10, 14, 0.2), color: c.accent },
  cardChevron: { marginBottom: 3 },

  reportCard: {
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: c.borderDashed,
    borderRadius: ds2Radii.card,
    backgroundColor: c.canvas,
  },
  reportIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ds2Radii.pill,
    backgroundColor: c.tint,
  },
  reportTitle: { marginTop: 10, ...ds2Text('semibold', 13, 19), color: c.body },
  reportSub: { marginTop: 3, ...ds2Text('regular', 13, 19), color: c.muted, textAlign: 'center' },
});
