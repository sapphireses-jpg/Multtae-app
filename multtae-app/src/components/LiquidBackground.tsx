/**
 * Liquid-glass background: lavender-blue gradient + slowly morphing white /
 * coral / blue blobs. The prototype uses CSS radial-gradient + blur + a
 * border-radius morph keyframe; RN has neither, so each blob is an SVG
 * radial gradient (color → transparent, which is inherently soft-edged) inside
 * an Animated.View that drifts and scales on a slow 16–20s loop.
 *
 * Design rule: never a flat background — always gradient + 2–3 blobs.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';
import { bgGradient, colors } from '../theme/tokens';

type BlobSpec = {
  id: string;
  color: string;
  style: object;
  duration: number;
};

const BLOBS: BlobSpec[] = [
  {
    id: 'white',
    color: colors.blobWhite,
    duration: 16000,
    style: { top: '-12%', left: '-18%', width: '75%', height: '46%' },
  },
  {
    id: 'pink',
    color: colors.blobPink,
    duration: 20000,
    style: { top: '30%', right: '-24%', width: '82%', height: '52%' },
  },
  {
    id: 'blue',
    color: colors.blobBlue,
    duration: 18000,
    style: { bottom: '-14%', left: '2%', width: '68%', height: '44%' },
  },
];

function Blob({ id, color, style, duration }: BlobSpec) {
  const t = useRef(new Animated.Value(0)).current;
  const gradId = `blob-${id}`;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(t, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(t, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [t, duration]);

  const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [-10, 14] });
  const translateY = t.interpolate({ inputRange: [0, 1], outputRange: [8, -12] });
  const scale = t.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.blob, style, { transform: [{ translateX }, { translateY }, { scale }] }]}
    >
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          <RadialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity={1} />
            <Stop offset="70%" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Ellipse cx={50} cy={50} rx={50} ry={50} fill={`url(#${gradId})`} />
      </Svg>
    </Animated.View>
  );
}

export function LiquidBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={bgGradient.colors}
        start={bgGradient.start}
        end={bgGradient.end}
        style={StyleSheet.absoluteFill}
      />
      {BLOBS.map((b) => (
        <Blob key={b.id} {...b} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute' },
});
