/**
 * Dev-only banner shown when the Supabase env vars are missing. The app still
 * runs (login falls back to mock mode — see auth.ts) but the developer gets a
 * visible pointer at the fix instead of a silent console.warn. Never rendered
 * in production builds.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, spacing, shadows } from '../theme/tokens';
import { type } from '../theme/typography';

export function ConfigNotice() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { top: insets.top + spacing.stackSm }]} pointerEvents="none">
      <View style={styles.card}>
        <Text style={styles.title}>Supabase 환경변수가 없어요 (개발용 안내)</Text>
        <Text style={styles.body}>
          .env.example을 .env로 복사한 뒤 EXPO_PUBLIC_SUPABASE_URL과{'\n'}
          EXPO_PUBLIC_SUPABASE_ANON_KEY를 채우고 `npx expo start -c`로
          재시작하세요. 지금은 로그인이 목(mock) 모드로 동작해요.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: spacing.marginMobile,
    right: spacing.marginMobile,
    zIndex: 10,
  },
  card: {
    backgroundColor: colors.errorBg,
    borderColor: colors.errorBorder,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingVertical: spacing.gutter,
    paddingHorizontal: spacing.stackMd,
    ...shadows.soft,
  },
  title: {
    ...type.labelLg,
    color: colors.error,
    marginBottom: 2,
  },
  body: {
    ...type.labelMd,
    color: colors.error,
  },
});
