/**
 * Permission_Request — 기기 권한 안내 (사전 안내). First-run onboarding step
 * between the tour and login. Layout per the Notion spec's design handoff:
 *
 *   1. 제목 + 안내문 + 보조문구
 *   2. 권한 카드 3개 (카메라 / 사진 / 위치) — identical layout, each with an
 *      icon, item name, one-line purpose, and an always-visible "선택" badge
 *      (no permission is required, so every card is optional)
 *   3. 데이터 처리 안내
 *   4. 단일 CTA `확인` + 보조 문구
 *
 * This screen is informational only — no consent UI, and it must never call
 * OS permission APIs. Actual permission prompts fire at feature use time
 * (camera → 인앱 촬영, photos → 사진첩 선택, location → 내 주변 항구 찾기).
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing } from '../theme/tokens';
import { type } from '../theme/typography';
import { GlassCard } from '../components/GlassCard';
import { CameraIcon, PhotoIcon, PinIcon } from '../components/icons';

const PERMISSIONS = [
  {
    key: 'camera',
    Icon: CameraIcon,
    name: '카메라',
    purpose: '인앱 조과 촬영, 인증용 기준자 촬영',
  },
  {
    key: 'photo',
    Icon: PhotoIcon,
    name: '사진',
    purpose: '직접 고른 조과 사진을 기록에 첨부',
  },
  {
    key: 'location',
    Icon: PinIcon,
    name: '위치',
    purpose: '현재 항구 자동 입력, 위치 조건 해금',
  },
] as const;

const DATA_NOTICES = [
  '위치는 기능을 실행할 때 기기에서만 일시적으로 사용해요.',
  '정밀 GPS 좌표는 서버에 저장하거나 공개하지 않아요.',
  '사진은 시스템 선택기로 직접 고른 사진만 사용해요.',
  '전화 권한은 요청하지 않아요.',
];

export function PermissionScreen({ onConfirm }: { onConfirm: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 48 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Title + reassurance copy */}
        <View style={styles.header}>
          <Text style={styles.title}>기기 권한 안내</Text>
          <Text style={styles.subtitle}>필요한 기능을 사용할 때만 권한을 요청해요.</Text>
          <Text style={styles.helper}>허용하지 않아도 도감과 기본 기록은 이용할 수 있어요.</Text>
        </View>

        {/* 2. Permission cards — all optional, badge always visible */}
        <View style={styles.cards}>
          {PERMISSIONS.map(({ key, Icon, name, purpose }) => (
            <GlassCard key={key} radius={20} padding={0} style={styles.card}>
              <View
                style={styles.cardInner}
                accessible
                accessibilityLabel={`${name} 권한, 선택 사항. ${purpose}`}
              >
                <View style={styles.cardIcon}>
                  <Icon size={20} />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardName}>{name}</Text>
                  <Text style={styles.cardPurpose}>{purpose}</Text>
                </View>
                <View style={styles.optionalBadge}>
                  <Text style={styles.optionalBadgeText}>선택</Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* 3. Data handling notice */}
        <GlassCard variant="soft" radius={20} padding={18} withShadow={false}>
          <Text style={styles.noticeTitle}>데이터 처리 안내</Text>
          <View style={styles.noticeList}>
            {DATA_NOTICES.map((line) => (
              <View key={line} style={styles.noticeRow}>
                <View style={styles.noticeDot} />
                <Text style={styles.noticeText}>{line}</Text>
              </View>
            ))}
          </View>
        </GlassCard>
      </ScrollView>

      {/* 4. Single confirm CTA — does NOT trigger any OS permission prompt */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.safeBottom) }]}>
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
        <Text style={styles.footerHint}>권한은 필요할 때 다시 요청할 수 있어요.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.stackLg,
  },
  header: { gap: 8, marginBottom: spacing.stackLg },
  title: { ...type.headlineMd, color: colors.ink },
  subtitle: { ...type.bodyLg, color: colors.body },
  helper: { ...type.labelMd, color: colors.muted },
  cards: { gap: 10, marginBottom: spacing.stackMd },
  card: { width: '100%' },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.brandTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1, gap: 2 },
  cardName: { fontFamily: 'NotoSansKR_700Bold', fontSize: 15, color: colors.ink },
  cardPurpose: { fontFamily: 'NotoSansKR_400Regular', fontSize: 12.5, color: colors.muted },
  optionalBadge: {
    backgroundColor: 'rgba(255,255,255,.4)',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  optionalBadgeText: { fontFamily: 'NotoSansKR_500Medium', fontSize: 11.5, color: colors.muted },
  noticeTitle: { ...type.labelLg, color: colors.ink, marginBottom: 10 },
  noticeList: { gap: 7 },
  noticeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  noticeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.muted,
    marginTop: 7,
  },
  noticeText: { ...type.labelMd, color: colors.body, flex: 1, lineHeight: 18 },
  footer: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: 8,
  },
  confirmBtn: {
    width: '100%',
    height: 52,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.brand,
  },
  confirmLabel: { ...type.button, color: colors.white },
  footerHint: { ...type.labelMd, color: colors.muted },
});
