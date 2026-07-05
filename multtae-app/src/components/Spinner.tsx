/**
 * Loading spinner matching the prototype's CSS ring (light track + darker arc,
 * 0.8s linear spin). Built from two SVG circles so track/arc colors can adapt
 * to each provider button (dark arc on Kakao/Google, white arc on Apple).
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export function Spinner({
  size = 18,
  trackColor,
  arcColor,
  strokeWidth = 2.5,
}: {
  size?: number;
  trackColor: string;
  arcColor: string;
  strokeWidth?: number;
}) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;

  return (
    <Animated.View style={{ width: size, height: size, transform: [{ rotate }] }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* ~25% arc, darker, forms the spinning "head" */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={arcColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c * 0.28} ${c}`}
        />
      </Svg>
    </Animated.View>
  );
}
