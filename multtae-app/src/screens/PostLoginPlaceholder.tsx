/**
 * Placeholder for what comes AFTER first login. Per the product decision the
 * real cold-start flow is: set a public nickname → "check the fish you've
 * caught" (seeds encyclopedia unlocks). Both are out of scope for the login
 * screen task, so this just confirms the session and offers sign-out.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Session } from '@supabase/supabase-js';
import { colors, radii, shadows, spacing } from '../theme/tokens';
import { type } from '../theme/typography';
import { WaveLogo } from '../components/WaveLogo';

export function PostLoginPlaceholder({
  session,
  onSignOut,
}: {
  session: Session;
  onSignOut: () => void;
}) {
  const insets = useSafeAreaInsets();
  const email = session.user.email ?? session.user.id;

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top + 48, paddingBottom: Math.max(insets.bottom, spacing.safeBottom) },
      ]}
    >
      <View style={styles.center}>
        <View style={styles.tile}>
          <WaveLogo size={60} />
        </View>
        <Text style={styles.title}>물때에 오신 걸 환영해요</Text>
        <Text style={styles.body}>
          다음은 닉네임 설정과{'\n'}잡아본 물고기 체크로 이어져요.
        </Text>
        <Text style={styles.meta}>{email}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onSignOut}
        style={({ pressed }) => [styles.btn, pressed && { backgroundColor: colors.brandActive, transform: [{ scale: 0.98 }] }]}
      >
        <Text style={styles.btnLabel}>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: spacing.marginMobile },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  tile: {
    width: 96,
    height: 96,
    borderRadius: radii.tile,
    backgroundColor: colors.glassSoft,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...shadows.glass,
  },
  title: { ...type.headlineMd, color: colors.ink },
  body: { ...type.bodyMd, color: colors.body, textAlign: 'center' },
  meta: { ...type.labelMd, color: colors.muted, marginTop: 8 },
  btn: {
    height: 52,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.brand,
  },
  btnLabel: { ...type.button, color: '#fff' },
});
