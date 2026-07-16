/**
 * Multtae app root. Renders the login flow inside a centered phone frame over
 * the liquid-glass background. Switches between the login screen and the
 * "둘러보기" tour, and listens for a Supabase session to advance past login.
 *
 * 둘러보기 exposure policy (Login_BeforeMain spec): completion is stored on
 * the device; the tour auto-shows exactly once on first launch, and after
 * that it is reachable only via the secondary link on the login screen.
 * Completing OR skipping both count as "seen".
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session } from '@supabase/supabase-js';
import { appFonts } from './src/theme/fonts';
import { colors, layout } from './src/theme/tokens';
import { LiquidBackground } from './src/components/LiquidBackground';
import { LoginScreen } from './src/screens/LoginScreen';
import { TourCarousel } from './src/components/TourCarousel';
import { FishSpeciesListScreen } from './src/screens/FishSpeciesListScreen';
import { supabase } from './src/lib/supabase';

type Screen = 'login' | 'tour';

const TOUR_SEEN_KEY = '@multtae/tour_seen';

export default function App() {
  const [fontsLoaded] = useFonts(appFonts);
  // null until the device flag is read — we hold rendering to avoid flashing
  // the login screen before deciding whether the tour auto-shows.
  const [view, setView] = useState<Screen | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(TOUR_SEEN_KEY)
      .then((seen) => setView(seen === '1' ? 'login' : 'tour'))
      .catch(() => setView('login'));
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const closeTour = useCallback(() => {
    setView('login');
    AsyncStorage.setItem(TOUR_SEEN_KEY, '1').catch(() => {});
  }, []);

  // 프로필 화면이 생기기 전까지의 임시 로그아웃 경로 — GNB 프로필 탭에서 확인
  // 후 signOut. 나머지 미구현 탭은 no-op.
  const handleTabPress = useCallback((tab: string) => {
    if (tab !== 'profile') return;
    Alert.alert('로그아웃', '로그아웃하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: () => supabase.auth.signOut() },
    ]);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.stage}>
        <View style={styles.frame}>
          <LiquidBackground />
          {fontsLoaded && view !== null ? (
            session ? (
              <FishSpeciesListScreen onPressTab={handleTabPress} />
            ) : view === 'tour' ? (
              <TourCarousel onClose={closeTour} />
            ) : (
              <LoginScreen onExplore={() => setView('tour')} />
            )
          ) : null}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  stage: { flex: 1, alignItems: 'center', backgroundColor: colors.bgEnd },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxWidth,
    overflow: 'hidden',
  },
});
