/**
 * Multtae app root. Renders the login flow inside a centered phone frame over
 * the liquid-glass background, and listens for a Supabase session to advance
 * past login.
 *
 * First-run sequence: 둘러보기 → 기기 권한 안내 (Permission_Request) → 로그인.
 * Each step's completion is stored on the device, so both auto-show exactly
 * once; a re-launch mid-sequence resumes at the first unseen step. After
 * first run, the tour is reachable only via the secondary link on the login
 * screen (closing it then returns straight to login), and the permission
 * notice never auto-reshows — per-feature re-prompts happen at use time.
 * Completing OR skipping the tour both count as "seen".
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
import { PermissionScreen } from './src/screens/PermissionScreen';
import { TourCarousel } from './src/components/TourCarousel';
import { PostLoginPlaceholder } from './src/screens/PostLoginPlaceholder';
import { supabase } from './src/lib/supabase';

type Screen = 'login' | 'tour' | 'permission';

const TOUR_SEEN_KEY = '@multtae/tour_seen';
const PERMISSION_SEEN_KEY = '@multtae/permission_seen';

export default function App() {
  const [fontsLoaded] = useFonts(appFonts);
  // null until the device flags are read — we hold rendering to avoid flashing
  // the login screen before deciding which first-run step auto-shows.
  const [view, setView] = useState<Screen | null>(null);
  const [permissionSeen, setPermissionSeen] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    AsyncStorage.multiGet([TOUR_SEEN_KEY, PERMISSION_SEEN_KEY])
      .then(([[, tourSeen], [, permSeen]]) => {
        setPermissionSeen(permSeen === '1');
        setView(tourSeen !== '1' ? 'tour' : permSeen !== '1' ? 'permission' : 'login');
      })
      .catch(() => setView('login'));
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const closeTour = useCallback(() => {
    setView(permissionSeen ? 'login' : 'permission');
    AsyncStorage.setItem(TOUR_SEEN_KEY, '1').catch(() => {});
  }, [permissionSeen]);

  const confirmPermissions = useCallback(() => {
    setPermissionSeen(true);
    setView('login');
    AsyncStorage.setItem(PERMISSION_SEEN_KEY, '1').catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.stage}>
        <View style={styles.frame}>
          <LiquidBackground />
          {fontsLoaded && view !== null ? (
            session ? (
              <PostLoginPlaceholder session={session} onSignOut={() => supabase.auth.signOut()} />
            ) : view === 'tour' ? (
              <TourCarousel onClose={closeTour} />
            ) : view === 'permission' ? (
              <PermissionScreen onConfirm={confirmPermissions} />
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
