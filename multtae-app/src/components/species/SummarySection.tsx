/**
 * 도감 수집 현황 카드 + 수집 뱃지 요약 버튼 (`.summary` / `.badge-summary`).
 * DS v2 강조 패널 패턴: 화이트 카드 안 핵심 지표만 라이트 블루 그라데이션
 * 패널로 옅게 강조, 나머지 지표는 화이트 유지.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { ds2Colors as c, ds2Radii, ds2Text } from '../../theme/ds2';
import type { BADGE_SUMMARY, COLLECTION_SUMMARY } from '../../data/species';
import { ChevronRightIcon, TrophyIcon } from './icons';

/** 64px conic 수집률 링 — 링 두께 7px, 중앙 흰 원 50px. */
function ProgressRing({ percent, label }: { percent: number; label: string }) {
  const size = 64;
  const strokeWidth = 7;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = (circumference * Math.min(Math.max(percent, 0), 100)) / 100;

  return (
    <View style={styles.ring}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.ringTrack} strokeWidth={strokeWidth} fill="#ffffff" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={c.brand}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${filled} ${circumference}`}
          // conic-gradient처럼 12시 방향에서 시작
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={styles.ringLabel}>{label}</Text>
    </View>
  );
}

export function CollectionSummaryCard({ summary }: { summary: typeof COLLECTION_SUMMARY }) {
  return (
    <View accessibilityLabel="도감 수집 현황" style={styles.summary}>
      <LinearGradient
        colors={c.panelGradient}
        locations={c.panelGradientLocations}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.summaryTop}
      >
        <View>
          <Text style={styles.eyebrow}>나의 도감 수집률</Text>
          <View style={styles.valueRow}>
            <Text style={styles.valueStrong}>{summary.percent}%</Text>
            <Text style={styles.valueSub}>
              {summary.collected} / {summary.total}종
            </Text>
          </View>
        </View>
        <ProgressRing percent={summary.percent} label={`${summary.collected}종`} />
      </LinearGradient>

      <View style={styles.metrics}>
        <Metric label="전체 기록" value={summary.totalCatch} />
        <Metric label="출조 횟수" value={summary.tripCount} divider />
        <Metric label="출조당 평균" value={summary.avgPerTrip} divider />
      </View>

      <View
        accessibilityLabel={`최근 출조일 ${summary.recentTripDate}`}
        style={styles.recentTripRow}
      >
        <View style={styles.recentTripChip}>
          <Text style={styles.recentTripLabel}>최근 출조일</Text>
          <Text style={styles.recentTripValue}>{summary.recentTripDate}</Text>
        </View>
      </View>
    </View>
  );
}

function Metric({ label, value, divider }: { label: string; value: string; divider?: boolean }) {
  return (
    <View style={[styles.metric, divider && styles.metricDivider]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

export function BadgeSummaryButton({
  badges,
  onPress,
}: {
  badges: typeof BADGE_SUMMARY;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`수집 뱃지 ${badges.count}개 보기`}
      onPress={onPress}
      style={({ pressed }) => [styles.badgeSummary, pressed && styles.badgePressed]}
    >
      <View style={styles.badgeLeft}>
        <TrophyIcon size={22} />
        <Text style={styles.badgeCount} numberOfLines={1}>
          뱃지 <Text style={styles.badgeCountStrong}>{badges.count}개 수집</Text>
        </Text>
      </View>
      <View style={styles.badgeRight}>
        <View style={styles.earnedBadge}>
          {badges.latestIsNew ? <View style={styles.badgeNewDot} /> : null}
          <Text style={styles.earnedBadgeLabel} numberOfLines={1}>
            {badges.latest}
          </Text>
        </View>
        <Text style={styles.moreBadge}>외 {badges.moreCount}개</Text>
        <View style={styles.badgeChevron}>
          <ChevronRightIcon />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: ds2Radii.panel,
    backgroundColor: c.canvas,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: 16,
    borderRadius: ds2Radii.stage,
  },
  eyebrow: { ...ds2Text('medium', 13, 19), color: c.brandActive },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 },
  valueStrong: { ...ds2Text('bold', 32, 38, -1), color: c.ink },
  valueSub: { ...ds2Text('medium', 14, 20), color: c.muted },
  ring: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  ringLabel: { position: 'absolute', ...ds2Text('bold', 13, 19), color: c.brandActive },
  metrics: { flexDirection: 'row', marginTop: 14, paddingHorizontal: 6 },
  metric: { flex: 1, paddingHorizontal: 8, alignItems: 'center' },
  metricDivider: { borderLeftWidth: 1, borderLeftColor: c.border },
  metricLabel: { ...ds2Text('regular', 12, 17), color: c.muted },
  metricValue: { marginTop: 3, ...ds2Text('semibold', 16, 23), color: c.ink },
  recentTripRow: {
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.borderSoft,
  },
  recentTripChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    minHeight: 32,
    paddingHorizontal: 14,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.brandTint,
  },
  recentTripLabel: { ...ds2Text('medium', 13, 19), color: c.brandTintLabel },
  recentTripValue: { ...ds2Text('bold', 14, 20), color: c.brandActive },

  badgeSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: ds2Radii.panel,
    backgroundColor: c.canvas,
  },
  badgePressed: { backgroundColor: c.pressed, transform: [{ scale: 0.98 }] },
  badgeLeft: { flexDirection: 'row', alignItems: 'center', gap: 9, flexShrink: 1 },
  badgeCount: { ...ds2Text('semibold', 14, 20), color: c.ink },
  badgeCountStrong: { ...ds2Text('semibold', 14, 20), color: c.ink },
  badgeRight: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6 },
  earnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    maxWidth: 100,
    minHeight: 30,
    paddingHorizontal: 11,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.brandTint,
  },
  earnedBadgeLabel: { ...ds2Text('semibold', 13, 19), color: c.brandActive, flexShrink: 1 },
  badgeNewDot: { width: 7, height: 7, borderRadius: ds2Radii.pill, backgroundColor: c.accent },
  moreBadge: { ...ds2Text('medium', 13, 19), color: c.muted, paddingHorizontal: 2 },
  badgeChevron: { width: 24, height: 30, alignItems: 'center', justifyContent: 'center' },
});
