/**
 * Supabase client. Auth-only MVP: social login (Kakao / Google / Apple).
 * No email/password, no phone auth — out of scope by product decision.
 *
 * Config comes from EXPO_PUBLIC_* env vars (see .env.example). They are public
 * by design — the anon key is safe to ship in the client; row-level security
 * guards the data.
 */
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  // Surfaced once at startup so the login screen can fall back to a mocked
  // flow (see auth.ts) instead of throwing on a missing project.
  console.warn(
    '[multtae] Supabase env not set — EXPO_PUBLIC_SUPABASE_URL / _ANON_KEY. ' +
      'Auth runs in mock mode until configured.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // Mobile deep-link redirect returns tokens in the URL, not the page URL bar.
    detectSessionInUrl: false,
  },
});
