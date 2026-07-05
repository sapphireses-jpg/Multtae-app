/**
 * Frosted glass surface — translucent white panel + backdrop blur + 1px white
 * hairline + soft glass shadow. The design system's core surface primitive.
 * `variant` maps to the opacity steps (glass 40% / soft 50%).
 *
 * The shadow lives on an outer wrapper; clipping (overflow hidden, which the
 * blur needs) lives on an inner wrapper — otherwise the shadow gets clipped too.
 */
import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii, shadows, blur } from '../theme/tokens';

export function GlassCard({
  children,
  variant = 'glass',
  radius = radii.xl,
  padding = 22,
  style,
  withShadow = true,
}: {
  children: React.ReactNode;
  variant?: 'glass' | 'soft';
  radius?: number;
  padding?: number;
  style?: ViewStyle;
  withShadow?: boolean;
}) {
  const fill = variant === 'soft' ? colors.glassSoft : colors.glass;
  const hairline = variant === 'soft' ? colors.hairlineSoft : colors.hairline;

  return (
    <View style={[{ borderRadius: radius }, withShadow ? shadows.glass : null, style]}>
      <View style={[styles.clip, { borderRadius: radius, borderColor: hairline }]}>
        <BlurView intensity={blur.md * 3} tint="light" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: fill }]} />
        <View style={{ padding }}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden', borderWidth: 1 },
});
