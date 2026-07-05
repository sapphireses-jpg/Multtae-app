/**
 * Social login button. Three visual states from the spec:
 *   idle     → brand logo + "…로 계속하기"
 *   loading  → spinner + "로그인 중…"  (only the tapped button)
 *   disabled → 40% opacity, non-interactive (the other buttons while one loads)
 * Each provider follows its official brand style. 52px tall, 16px radius,
 * scale(0.98) on press.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme/tokens';
import { type } from '../theme/typography';
import { Spinner } from './Spinner';
import { KakaoLogo, GoogleLogo, AppleLogo } from './icons';
import type { SocialProvider } from '../lib/auth';

type ProviderStyle = {
  label: string;
  bg: string;
  fg: string;
  borderColor?: string;
  Logo: React.ComponentType<{ size?: number }>;
  spinnerTrack: string;
  spinnerArc: string;
};

const PROVIDERS: Record<SocialProvider, ProviderStyle> = {
  kakao: {
    label: '카카오로 계속하기',
    bg: colors.kakao,
    fg: colors.kakaoInk,
    Logo: KakaoLogo,
    spinnerTrack: 'rgba(0,0,0,.2)',
    spinnerArc: 'rgba(0,0,0,.75)',
  },
  google: {
    label: 'Google로 계속하기',
    bg: colors.google,
    fg: colors.googleInk,
    borderColor: colors.googleBorder,
    Logo: GoogleLogo,
    spinnerTrack: 'rgba(0,0,0,.15)',
    spinnerArc: colors.googleInk,
  },
  apple: {
    label: 'Apple로 계속하기',
    bg: colors.apple,
    fg: colors.appleInk,
    Logo: AppleLogo,
    spinnerTrack: 'rgba(255,255,255,.25)',
    spinnerArc: '#fff',
  },
};

export function SocialButton({
  provider,
  loading,
  disabled,
  onPress,
}: {
  provider: SocialProvider;
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const p = PROVIDERS[provider];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      accessibilityLabel={loading ? '로그인 중' : p.label}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: p.bg },
        p.borderColor ? { borderWidth: 1, borderColor: p.borderColor } : null,
        disabled ? styles.disabled : null,
        pressed && !disabled ? styles.pressed : null,
      ]}
    >
      {loading ? (
        <>
          <Spinner size={18} trackColor={p.spinnerTrack} arcColor={p.spinnerArc} />
          <Text style={[styles.label, { color: p.fg }]}>로그인 중…</Text>
        </>
      ) : (
        <>
          <View style={styles.logo}>
            <p.Logo size={18} />
          </View>
          <Text style={[styles.label, { color: p.fg }]}>{p.label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabled: { opacity: 0.4 },
  pressed: { transform: [{ scale: 0.98 }] },
  logo: { width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  label: { ...type.button },
});
