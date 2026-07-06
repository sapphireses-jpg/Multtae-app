/**
 * Permission_Request — 기기 권한 안내 (사전 안내). First-run onboarding step
 * between the tour and login. Ported 1:1 from the Claude Design handoff
 * (기기권한 안내 screen):
 *
 *   1. 로고 타일(44px 글래스) + 2줄 제목 + 2줄 안내문
 *   2. 권한 카드 3개 (카메라 / 사진 / 위치) — 아이콘 타일 + 항목명 + 목적 1줄
 *      + `선택` 배지 (필수 권한 없음)
 *   3. 데이터 처리 안내 — 실드 아이콘 + 한 문단 (소프트 글래스)
 *   4. 하단 `확인` 버튼(48px) + 보조 문구
 *
 * Sections enter with the handoff's staggered fade/slide (430ms, 120ms apart).
 * This screen is informational only — no consent UI, and it must never call
 * OS permission APIs. Actual permission prompts fire at feature use time.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing } from '../theme/tokens';
import { fontFamily, type } from '../theme/typography';
import { GlassCard } from '../components/GlassCard';
import { WaveLogo } from '../components/WaveLogo';
import { CameraIcon, PhotoIcon, PinIcon, ShieldCheckIcon } from '../components/icons';

const PERMISSIONS = [
  {
    key: 'camera',
    Icon: CameraIcon,
    name: '카메라',
    purpose: '조과 사진을 바로 찍어 기록할 때 사용해요',
  },
  {
    key: 'photo',
    Icon: PhotoIcon,
    name: '사진',
    purpose: '앨범 사진을 출조 기록에 붙일 때 사용해요',
  },
  {
    key: 'location',
    Icon: PinIcon,
    name: '위치',
    purpose: '주변 포인트의 물때를 보여줄 때 사용해요',
  },
] as const;

const DATA_NOTICE =
  '수집한 정보는 물때·출조 기능 제공에만 사용하고, 기기 밖으로 보내거나 ' +
  '다른 목적으로 쓰지 않아요. 권한별 안내는 앱 설정에서 다시 볼 수 있어요.';

/** Handoff's `mt-enter` keyframes: fade in + 8px rise, staggered per section. */
function EnterSection({ delay, children }: { delay: number; children: React.ReactNode }) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 430,
      delay,
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);

  return (
    <Animated.View
      style={{
        opacity: progress,
        transform: [
          { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}

export function PermissionScreen({ onConfirm }: { onConfirm: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 16, 64) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Logo tile + title + reassurance copy */}
        <EnterSection delay={0}>
          <View style={styles.header}>
            <View style={styles.logoTile}>
              <WaveLogo size={28} />
            </View>
            <Text style={styles.title}>물때 이용에 필요한{'\n'}권한을 알려드려요</Text>
            <Text style={styles.subtitle}>
              지금 허용하지 않아도 괜찮아요.{'\n'}각 기능을 처음 사용할 때만 요청해요.
            </Text>
          </View>
        </EnterSection>

        {/* 2. Permission cards — all optional, `선택` badge on each */}
        <EnterSection delay={120}>
          <View style={styles.cards}>
            {PERMISSIONS.map(({ key, Icon, name, purpose }) => (
              <GlassCard key={key} radius={radii.xl} padding={0}>
                <View
                  style={styles.cardInner}
                  accessible
                  accessibilityLabel={`${name} 권한, 선택 사항. ${purpose}`}
                >
                  <View style={styles.cardIcon}>
                    <Icon size={22} />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.cardName}>{name}</Text>
                    {/* 디자인의 word-break: keep-all — 한글 어절 단위 줄바꿈 (iOS) */}
                    <Text style={styles.cardPurpose} lineBreakStrategyIOS="hangul-word">
                      {purpose}
                    </Text>
                  </View>
                  <View style={styles.optionalBadge}>
                    <Text style={styles.optionalBadgeText}>선택</Text>
                  </View>
                </View>
              </GlassCard>
            ))}
          </View>
        </EnterSection>

        {/* 3. Data handling notice — one paragraph, shield mark */}
        <EnterSection delay={240}>
          <GlassCard variant="soft" radius={radii.lg} padding={0} withShadow={false}>
            <View style={styles.noticeInner}>
              <View style={styles.noticeIcon}>
                <ShieldCheckIcon size={16} />
              </View>
              <Text style={styles.noticeText} lineBreakStrategyIOS="hangul-word">
                {DATA_NOTICE}
              </Text>
            </View>
          </GlassCard>
        </EnterSection>
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
        <Text style={styles.footerHint} lineBreakStrategyIOS="hangul-word">
          권한은 기기 설정에서 언제든지 바꿀 수 있어요
        </Text>
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
    gap: 28,
  },
  header: { gap: 14 },
  logoTile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.glassSoft,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glass,
  },
  title: { ...type.headlineLg, color: colors.ink },
  subtitle: { ...type.bodyMd, color: colors.body, lineHeight: 21 },
  cards: { gap: spacing.gutter },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.brandTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1, gap: 2 },
  cardName: { ...type.labelLg, fontFamily: fontFamily.bold, color: colors.ink },
  cardPurpose: { ...type.labelMd, color: colors.muted },
  optionalBadge: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  optionalBadgeText: { fontFamily: fontFamily.medium, fontSize: 11.5, color: colors.muted },
  noticeInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  noticeIcon: { marginTop: 1 },
  noticeText: { ...type.labelMd, color: colors.body, lineHeight: 18, flex: 1 },
  footer: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: 16,
  },
  confirmBtn: {
    width: '100%',
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.brand,
  },
  confirmLabel: { ...type.button, color: colors.white },
  footerHint: { ...type.labelMd, color: colors.muted },
});
