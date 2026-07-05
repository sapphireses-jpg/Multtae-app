/**
 * 기기 권한 안내 (사전 안내) — screen ID `Permission_Request`.
 *
 * Pre-notice only: this screen never triggers OS permission popups and has no
 * allow/deny choice. The single `확인` CTA just moves the user forward; each
 * OS prompt is called later, at the moment its feature runs (in-app capture,
 * photo picker, "내 주변 항구 찾기"). Layout per the Notion spec:
 *
 *   1. Title + reassurance copy ("필요한 기능을 사용할 때만 권한을 요청해요")
 *   2. Three identical permission cards (카메라 / 사진 / 위치 —
 *      icon + name + one-line purpose)
 *   3. Data-handling notice (no precise-GPS upload, picker-first photos, …)
 *   4. Fixed bottom: `확인` button + "권한은 필요할 때 다시 요청할 수 있어요."
 *
 * Shown once after first login; re-guidance on denied/blocked permissions is
 * handled by each feature screen, not here.
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing } from '../theme/tokens';
import { type } from '../theme/typography';
import { GlassCard } from '../components/GlassCard';
import { CameraIcon, PhotoIcon, PinIcon, ShieldIcon } from '../components/icons';

const PERMISSIONS = [
  {
    key: 'camera',
    Icon: CameraIcon,
    name: '카메라',
    purpose: '인앱 조과 촬영과 공식 인증용 기준자 촬영에 사용해요.',
    when: '인앱 촬영을 선택할 때 요청',
  },
  {
    key: 'photo',
    Icon: PhotoIcon,
    name: '사진',
    purpose: '직접 고른 조과 사진을 기록에 첨부할 때 사용해요.',
    when: '사진첩에서 선택할 때 요청',
  },
  {
    key: 'location',
    Icon: PinIcon,
    name: '위치',
    purpose: '현재 항구 프리필과 기기 내 위치 조건 확인에 사용해요.',
    when: '내 주변 항구 찾기·위치 조건 확인 시 요청',
  },
] as const;

const DATA_NOTES = [
  '위치는 기능 실행 시 기기에서 일시적으로만 사용해요.',
  '정밀 GPS 좌표를 서버에 저장·백업·공개하지 않아요.',
  '사진은 직접 선택하거나 촬영한 기록에만 사용해요.',
  '사진첩 등록은 시스템 사진 선택기를 우선 사용해 전체 사진 접근을 최소화해요.',
  '전화 기능은 권한 요청 없이 전화 앱 연결만 사용해요.',
];

export function PermissionGuideScreen({ onConfirm }: { onConfirm: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: Math.max(insets.bottom, spacing.safeBottom) }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 56 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Title + reassurance */}
        <Text style={styles.title}>기기 권한 안내</Text>
        <Text style={styles.lead}>필요한 기능을 사용할 때만 권한을 요청해요.</Text>
        <Text style={styles.sub}>허용하지 않아도 도감과 기본 기록은 이용할 수 있어요.</Text>

        {/* 2. Permission cards — identical layout: icon + name + purpose */}
        <View style={styles.cards}>
          {PERMISSIONS.map(({ key, Icon, name, purpose, when }) => (
            <GlassCard key={key} variant="soft" radius={radii.xl} padding={16}>
              <View style={styles.cardRow}>
                <View style={styles.iconTile}>
                  <Icon size={22} />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardName}>{name}</Text>
                  <Text style={styles.cardPurpose}>{purpose}</Text>
                  <Text style={styles.cardWhen}>{when}</Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* 3. Data-handling notice */}
        <View style={styles.notice}>
          <View style={styles.noticeHeader}>
            <ShieldIcon size={16} />
            <Text style={styles.noticeTitle}>데이터 처리 안내</Text>
          </View>
          {DATA_NOTES.map((note) => (
            <View key={note} style={styles.noteRow}>
              <Text style={styles.noteBullet}>·</Text>
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 4. Bottom action — single CTA, no allow/deny choice */}
      <View style={styles.bottom}>
        <Pressable
          accessibilityRole="button"
          onPress={onConfirm}
          style={({ pressed }) => [
            styles.confirmBtn,
            pressed && { backgroundColor: colors.brandActive, transform: [{ scale: 0.98 }] },
          ]}
        >
          <Text style={styles.confirmLabel}>확인</Text>
        </Pressable>
        <Text style={styles.bottomHint}>권한은 필요할 때 다시 요청할 수 있어요.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.stackLg,
  },
  title: { ...type.headlineLg, color: colors.ink },
  lead: { ...type.bodyLg, color: colors.body, marginTop: 10 },
  sub: { ...type.bodyMd, color: colors.muted, marginTop: 4 },
  cards: { gap: spacing.gutter, marginTop: spacing.stackLg },
  cardRow: { flexDirection: 'row', gap: 14 },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.brandTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1, gap: 2 },
  cardName: { ...type.headlineSm, color: colors.ink },
  cardPurpose: { ...type.bodyMd, color: colors.body },
  cardWhen: { ...type.labelMd, color: colors.muted, marginTop: 2 },
  notice: { marginTop: spacing.stackLg, paddingHorizontal: 4, gap: 6 },
  noticeHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  noticeTitle: { ...type.labelLg, color: colors.body },
  noteRow: { flexDirection: 'row', gap: 6 },
  noteBullet: { ...type.labelMd, color: colors.muted, lineHeight: 17 },
  noteText: { ...type.labelMd, color: colors.muted, flex: 1, lineHeight: 17 },
  bottom: { paddingHorizontal: spacing.marginMobile, paddingTop: spacing.stackSm },
  confirmBtn: {
    height: 52,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.brand,
  },
  confirmLabel: { ...type.button, color: colors.white },
  bottomHint: {
    ...type.labelMd,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 12,
  },
});
