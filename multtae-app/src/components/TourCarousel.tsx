/**
 * "로그인 없이 둘러보기" onboarding — 3 glass-card slides:
 *   1. 오늘의 물때 (tide curve)   2. 조과 기록 (catch log)   3. 출조 알림 (tide alerts)
 * Skip / start both return to the login screen. Swipeable, with a Next button
 * and pill indicators that widen for the active slide.
 */
import React, { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing, blur } from '../theme/tokens';
import { type } from '../theme/typography';
import { GlassCard } from './GlassCard';
import { TideChart, FishIcon, ChevronUp, ChevronDown } from './icons';
import { BlurView } from 'expo-blur';

const SLIDES = [0, 1, 2];

export function TourCarousel({ onClose }: { onClose: () => void }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [slide, setSlide] = useState(0);

  const goTo = (i: number) => scrollRef.current?.scrollTo({ x: i * width, animated: true });

  const onNext = () => {
    if (slide >= 2) onClose();
    else goTo(slide + 1);
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== slide) setSlide(i);
  };

  return (
    <View style={styles.root}>
      {/* Skip */}
      <View style={[styles.skipRow, { paddingTop: insets.top + 18 }]}>
        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.7 }]}
        >
          <BlurView intensity={blur.sm * 2} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.skipFill} />
          <Text style={styles.skipText}>건너뛰기</Text>
        </Pressable>
      </View>

      {/* Slide track */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={styles.track}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Slide width={width}>
          <TideSlideCard />
          <SlideCaption
            title="오늘의 물때를 한눈에"
            body={'만조·간조와 물때를 곡선으로 보여드려요.\n지금 물이 가는지, 한 번에 알 수 있어요.'}
          />
        </Slide>

        <Slide width={width}>
          <View style={styles.cardStack}>
            <CatchRow name="감성돔 42cm" meta="격포항 · 7물 · 만조 전 1시간" primary />
            <CatchRow name="농어 55cm" meta="방파제 · 사리 · 썰물" />
          </View>
          <SlideCaption
            title="조과를 물때와 함께 기록"
            body={'잡은 순간의 물때·포인트가 자동으로 남아요.\n기록이 쌓이면 나만의 패턴이 보여요.'}
          />
        </Slide>

        <Slide width={width}>
          <View style={styles.cardStack}>
            <TideAlertRow
              rising
              time="만조 17:58"
              meta="해수면 598cm"
              badge="다가옴"
              badgeAccent
            />
            <TideAlertRow time="간조 23:47" meta="해수면 131cm" badge="예정" />
          </View>
          <SlideCaption
            title="출조 타이밍을 놓치지 않게"
            body={'저장한 포인트의 만조·간조가 다가오면\n미리 알려드려요.'}
          />
        </Slide>
      </ScrollView>

      {/* Indicator + Next */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.safeBottom) }]}>
        <View style={styles.dots}>
          {SLIDES.map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { width: slide === i ? 22 : 8, backgroundColor: slide === i ? colors.brand : 'rgba(25,28,30,.15)' },
              ]}
            />
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onNext}
          style={({ pressed }) => [
            styles.nextBtn,
            pressed && { backgroundColor: colors.brandActive, transform: [{ scale: 0.98 }] },
          ]}
        >
          <Text style={styles.nextLabel}>{slide >= 2 ? '시작하기' : '다음'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Slide({ children, width }: { children: React.ReactNode; width: number }) {
  return <View style={[styles.slide, { width }]}>{children}</View>;
}

function SlideCaption({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.caption}>
      <Text style={[type.headlineMd, { color: colors.ink, textAlign: 'center' }]}>{title}</Text>
      <Text style={[type.bodyMd, { color: colors.body, textAlign: 'center' }]}>{body}</Text>
    </View>
  );
}

// ── Slide 1: tide card ────────────────────────────────────────────────
function TideSlideCard() {
  return (
    <GlassCard style={styles.tideCard}>
      <View style={styles.cardHeader}>
        <Text style={[type.headlineSm, { color: colors.ink, fontSize: 15 }]}>격포항</Text>
        <View style={styles.tideBadge}>
          <Text style={[type.displaySm, { color: colors.accent }]}>7물</Text>
        </View>
      </View>
      <TideChart />
      <Text style={[type.labelMd, { color: colors.muted }]}>
        만조 05:42 · 간조 11:51 · 음력 5.20
      </Text>
    </GlassCard>
  );
}

// ── Slide 2: catch rows ───────────────────────────────────────────────
function CatchRow({ name, meta, primary }: { name: string; meta: string; primary?: boolean }) {
  return (
    <GlassCard
      variant={primary ? 'glass' : 'soft'}
      radius={20}
      padding={0}
      withShadow={!!primary}
      style={styles.row}
    >
      <View style={styles.rowInner}>
        <View style={styles.rowIconTint}>
          <FishIcon size={18} />
        </View>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{name}</Text>
          <Text style={styles.rowMeta}>{meta}</Text>
        </View>
      </View>
    </GlassCard>
  );
}

// ── Slide 3: tide alert rows ──────────────────────────────────────────
function TideAlertRow({
  time,
  meta,
  badge,
  badgeAccent,
  rising,
}: {
  time: string;
  meta: string;
  badge: string;
  badgeAccent?: boolean;
  rising?: boolean;
}) {
  return (
    <GlassCard
      variant={badgeAccent ? 'glass' : 'soft'}
      radius={20}
      padding={0}
      withShadow={!!badgeAccent}
      style={styles.row}
    >
      <View style={styles.rowInner}>
        <View style={styles.rowIconInfo}>{rising ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</View>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{time}</Text>
          <Text style={styles.rowMeta}>{meta}</Text>
        </View>
        {badgeAccent ? (
          <View style={styles.comingBadge}>
            <Text style={styles.comingBadgeText}>{badge}</Text>
          </View>
        ) : (
          <View style={styles.plannedBadge}>
            <Text style={styles.plannedBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.marginMobile,
  },
  skipBtn: {
    overflow: 'hidden',
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    paddingHorizontal: 16,
    paddingVertical: 9,
    ...shadows.soft,
  },
  skipFill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.glassStrong },
  skipText: { ...type.labelMd, color: colors.body },
  track: { flex: 1 },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 32,
  },
  cardStack: { width: '100%', maxWidth: 300, gap: 10 },
  caption: { alignItems: 'center', gap: 8 },
  tideCard: { width: '100%', maxWidth: 300, gap: 12 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tideBadge: {
    backgroundColor: colors.accentTint,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  row: { width: '100%' },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowIconTint: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: colors.brandTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconInfo: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: 'rgba(46,111,163,.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, gap: 1 },
  rowTitle: { fontFamily: 'NotoSansKR_700Bold', fontSize: 14.5, color: colors.ink },
  rowMeta: { fontFamily: 'NotoSansKR_400Regular', fontSize: 12, color: colors.muted },
  comingBadge: {
    backgroundColor: colors.accentTint,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  comingBadgeText: { fontFamily: 'NotoSansKR_700Bold', fontSize: 11.5, color: colors.accent },
  plannedBadge: {
    backgroundColor: 'rgba(255,255,255,.4)',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  plannedBadgeText: { fontFamily: 'NotoSansKR_400Regular', fontSize: 11.5, color: colors.muted },
  footer: { alignItems: 'center', gap: 22, paddingHorizontal: spacing.marginMobile, paddingTop: 8 },
  dots: { flexDirection: 'row', gap: 8 },
  dot: { height: 8, borderRadius: radii.pill },
  nextBtn: {
    width: '100%',
    height: 52,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.brand,
  },
  nextLabel: { ...type.button, color: '#fff' },
});
