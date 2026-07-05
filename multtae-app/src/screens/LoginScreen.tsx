/**
 * Multtae login — the un-logged-in user's first screen. Pure social login
 * (Kakao → Google → Apple). Final layout order, per the design chat:
 *
 *   1. Value prop  (logo tile · 물때 · "물 흐름을 아는 낚시의 시작")
 *   2. Inline error (cancel / network / failure), just above the buttons
 *   3. Social buttons  ← the screen's primary action
 *   4. "로그인 없이 둘러보기"  (muted, lower-hierarchy alternative)
 *   5. Clickwrap notice  (terms · privacy · age 14+), bottom-most
 *
 * No email/password, no phone, no separate consent step — social login IS
 * sign-up. On login the tapped button shows a spinner and the others disable.
 */
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing } from '../theme/tokens';
import { type } from '../theme/typography';
import { WaveLogo } from '../components/WaveLogo';
import { SocialButton } from '../components/SocialButton';
import { LegalSheet, type LegalKind } from '../components/LegalSheet';
import { ChevronRight, ErrorCircle } from '../components/icons';
import {
  signIn,
  messageForFailure,
  type SocialProvider,
  type AuthFailure,
} from '../lib/auth';

const PROVIDERS: SocialProvider[] = ['kakao', 'google', 'apple'];

// Mirrors the prototype's `loginOutcome` sim prop; used only when Supabase
// isn't configured. Default matches the prototype default (network error).
function mockOutcome(): AuthFailure | 'success' {
  const raw = (process.env.EXPO_PUBLIC_MOCK_OUTCOME ?? 'network').toLowerCase();
  const map: Record<string, AuthFailure | 'success'> = {
    취소: 'cancelled',
    cancelled: 'cancelled',
    네트워크: 'network',
    network: 'network',
    실패: 'failed',
    failed: 'failed',
    계정: 'account',
    account: 'account',
    성공: 'success',
    success: 'success',
  };
  return map[raw] ?? 'network';
}

export function LoginScreen({ onExplore }: { onExplore: () => void }) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState<SocialProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sheet, setSheet] = useState<LegalKind | null>(null);
  const mounted = useRef(true);

  const handlePress = useCallback(async (provider: SocialProvider) => {
    if (loading) return;
    setLoading(provider);
    setError(null);
    const result = await signIn(provider, mockOutcome());
    if (!mounted.current) return;
    setLoading(null);
    if (!result.ok) setError(messageForFailure(result.reason));
    // On success the auth-state listener (App) swaps to the post-login flow.
  }, [loading]);

  React.useEffect(() => () => { mounted.current = false; }, []);

  return (
    <View style={[styles.root, { paddingBottom: Math.max(insets.bottom, spacing.safeBottom) }]}>
      {/* 1. Value proposition */}
      <View style={[styles.hero, { paddingTop: insets.top + 48 }]}>
        <View style={styles.logoTile}>
          <WaveLogo size={60} />
        </View>
        <Text style={styles.wordmark}>물때</Text>
        <Text style={styles.tagline}>물 흐름을 아는 낚시의 시작</Text>
      </View>

      {/* 2. Inline error */}
      {error ? (
        <View style={styles.errorBox} accessibilityRole="alert">
          <ErrorCircle size={16} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* 3. Social buttons */}
      <View style={styles.buttons}>
        {PROVIDERS.map((provider) => (
          <SocialButton
            key={provider}
            provider={provider}
            loading={loading === provider}
            disabled={loading !== null && loading !== provider}
            onPress={() => handlePress(provider)}
          />
        ))}
      </View>

      {/* 4. Explore without login (lower hierarchy) */}
      <View style={styles.exploreRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onExplore}
          style={({ pressed }) => [styles.exploreBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.exploreText}>로그인 없이 둘러보기</Text>
          <ChevronRight size={12} color={colors.muted} />
        </Pressable>
      </View>

      {/* 5. Clickwrap notice */}
      <Text style={styles.clickwrap}>
        계속하면{' '}
        <Text style={styles.clickwrapLink} onPress={() => setSheet('terms')}>
          이용약관
        </Text>
        ·
        <Text style={styles.clickwrapLink} onPress={() => setSheet('privacy')}>
          개인정보처리방침
        </Text>
        에 동의하며,{'\n'}만 14세 이상임을 확인합니다.
      </Text>

      <LegalSheet kind={sheet} onClose={() => setSheet(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: spacing.marginMobile,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTile: {
    width: 96,
    height: 96,
    borderRadius: radii.tile,
    backgroundColor: colors.glassSoft,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glass,
  },
  wordmark: { ...type.displayMd, color: colors.ink, marginTop: 18 },
  tagline: { ...type.bodyMd, color: colors.muted, marginTop: 6 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
  },
  errorText: { ...type.labelMd, color: colors.error, flex: 1 },
  buttons: { gap: 10 },
  exploreRow: { alignItems: 'center', marginTop: 6 },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  exploreText: {
    ...type.labelMd,
    color: colors.muted,
    textDecorationLine: 'underline',
  },
  clickwrap: {
    ...type.labelMd,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 14,
  },
  clickwrapLink: {
    color: colors.body,
    fontFamily: 'NotoSansKR_500Medium',
    textDecorationLine: 'underline',
  },
});
