/**
 * Supabase client. Auth-only MVP: social login (Kakao / Google / Apple).
 * No email/password, no phone auth — out of scope by product decision.
 *
 * Config comes from EXPO_PUBLIC_* env vars (see .env.example). They are public
 * by design — the anon key is safe to ship in the client; row-level security
 * guards the data.
 *
 * When the env vars are missing the export is `null` instead of a client:
 * `createClient('')` throws "supabaseUrl is required" at module load, which
 * crashes Expo Go before the first screen can render. Callers must go through
 * `isSupabaseConfigured` / a null check; auth.ts falls back to mock mode and
 * App.tsx shows a dev notice.
 */
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  console.warn(
    '[multtae] Supabase env not set — EXPO_PUBLIC_SUPABASE_URL / _ANON_KEY ' +
      '(.env 참고, 수정 후 `npx expo start -c`로 재시작). ' +
      'Auth runs in mock mode until configured.',
  );
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        // Mobile deep-link redirect returns tokens in the URL, not the page URL bar.
        detectSessionInUrl: false,
      },
    })
  : null;
