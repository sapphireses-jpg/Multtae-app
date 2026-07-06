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
import { StyleSheet, View } from 'react-native';
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
import { PostLoginPlaceholder } from './src/screens/PostLoginPlaceholder';
import { ConfigNotice } from './src/components/ConfigNotice';
import { supabase, isSupabaseConfigured } from './src/lib/supabase';

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
    // Without Supabase config there is no client — auth runs mocked (auth.ts)
    // and no session can exist, so there is nothing to subscribe to.
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const closeTour = useCallback(() => {
    setView('login');
    AsyncStorage.setItem(TOUR_SEEN_KEY, '1').catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.stage}>
        <View style={styles.frame}>
          <LiquidBackground />
          {fontsLoaded && view !== null ? (
            session ? (
              <PostLoginPlaceholder session={session} onSignOut={() => supabase?.auth.signOut()} />
            ) : view === 'tour' ? (
              <TourCarousel onClose={closeTour} />
            ) : (
              <LoginScreen onExplore={() => setView('tour')} />
            )
          ) : null}
          {__DEV__ && !isSupabaseConfigured ? <ConfigNotice /> : null}
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
