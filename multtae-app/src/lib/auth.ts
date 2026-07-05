/**
 * Social sign-in for the three MVP providers.
 *
 *  - Kakao / Google: Supabase OAuth web flow opened in a secure in-app browser
 *    session, then the returned deep link is exchanged for a session.
 *  - Apple: native Sign in with Apple on iOS (App Store requirement), exchanged
 *    for a Supabase session via id-token. Falls back to the web flow elsewhere.
 *
 * Every path resolves to an `AuthResult` whose `reason` maps directly to the
 * four inline error strings from the Login_BeforeMain spec (오류·예외 상태 표):
 *   cancelled → "로그인을 취소했어요."                        (OAuth 인증 취소)
 *   network   → "네트워크 연결을 확인한 뒤 다시 시도해 주세요."  (네트워크 오류)
 *   failed    → "로그인에 실패했어요. 잠시 후 다시 시도해 주세요." (소셜 제공자 인증 실패)
 *   account   → "계정을 불러오지 못했어요. 다시 시도해 주세요."   (서버 계정 처리 실패)
 */
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import type { Provider } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';

WebBrowser.maybeCompleteAuthSession();

export type SocialProvider = 'kakao' | 'google' | 'apple';
export type AuthFailure = 'cancelled' | 'network' | 'failed' | 'account';
export type AuthResult = { ok: true } | { ok: false; reason: AuthFailure };

// Deep link the OAuth provider redirects back to. `scheme` matches app.json.
const redirectTo = makeRedirectUri({ scheme: 'multtae', path: 'auth-callback' });

function looksLikeNetworkError(err: unknown): boolean {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return (
    msg.includes('network') ||
    msg.includes('timeout') ||
    msg.includes('fetch') ||
    msg.includes('connection') ||
    msg.includes('offline')
  );
}

/**
 * Pull tokens out of the redirect URL and hand them to Supabase.
 * The provider has already authenticated the user by the time we get here, so
 * errors in this step are "서버 계정 처리 실패" → `account` (not `failed`).
 */
async function completeSessionFromUrl(url: string): Promise<AuthResult> {
  // Supabase returns tokens in the URL fragment (#access_token=...&refresh_token=...);
  // PKCE returns a ?code= query param. Handle both.
  const fragment = url.includes('#') ? url.split('#')[1] : '';
  const params = new URLSearchParams(fragment);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');

  if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({ access_token, refresh_token });
    return error
      ? { ok: false, reason: looksLikeNetworkError(error) ? 'network' : 'account' }
      : { ok: true };
  }

  const code = new URL(url).searchParams.get('code');
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return error
      ? { ok: false, reason: looksLikeNetworkError(error) ? 'network' : 'account' }
      : { ok: true };
  }

  // Redirect came back without tokens — the provider auth itself failed.
  return { ok: false, reason: 'failed' };
}

/** Kakao / Google / (non-iOS) Apple via the Supabase OAuth web flow. */
async function signInWithOAuth(provider: Provider): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo, skipBrowserRedirect: true },
    });
    if (error || !data?.url) {
      return { ok: false, reason: looksLikeNetworkError(error) ? 'network' : 'failed' };
    }

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    if (result.type === 'cancel' || result.type === 'dismiss') {
      return { ok: false, reason: 'cancelled' };
    }
    if (result.type !== 'success' || !result.url) {
      return { ok: false, reason: 'failed' };
    }
    return await completeSessionFromUrl(result.url);
  } catch (err) {
    return { ok: false, reason: looksLikeNetworkError(err) ? 'network' : 'failed' };
  }
}

/** Native Sign in with Apple (iOS), exchanged for a Supabase session. */
async function signInWithApple(): Promise<AuthResult> {
  if (Platform.OS !== 'ios') return signInWithOAuth('apple');
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (!credential.identityToken) return { ok: false, reason: 'failed' };

    // Apple has vouched for the user; a failure here is server-side account
    // processing → `account`.
    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: credential.identityToken,
    });
    return error
      ? { ok: false, reason: looksLikeNetworkError(error) ? 'network' : 'account' }
      : { ok: true };
  } catch (err) {
    // The native sheet throws ERR_REQUEST_CANCELED when the user backs out.
    if (err instanceof Error && err.message.includes('ERR_REQUEST_CANCELED')) {
      return { ok: false, reason: 'cancelled' };
    }
    return { ok: false, reason: looksLikeNetworkError(err) ? 'network' : 'failed' };
  }
}

/**
 * Entry point used by the login screen. When Supabase isn't configured yet,
 * runs a mocked delay so the prototype's loading/error states stay demoable —
 * the outcome is controlled by `mockOutcome`.
 */
export async function signIn(
  provider: SocialProvider,
  mockOutcome?: AuthFailure | 'success',
): Promise<AuthResult> {
  if (!isSupabaseConfigured) {
    await new Promise((r) => setTimeout(r, 1600));
    if (!mockOutcome || mockOutcome === 'success') return { ok: true };
    return { ok: false, reason: mockOutcome };
  }
  return provider === 'apple' ? signInWithApple() : signInWithOAuth(provider);
}

export function messageForFailure(reason: AuthFailure): string {
  switch (reason) {
    case 'cancelled':
      return '로그인을 취소했어요.';
    case 'network':
      return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
    case 'account':
      return '계정을 불러오지 못했어요. 다시 시도해 주세요.';
    case 'failed':
    default:
      return '로그인에 실패했어요. 잠시 후 다시 시도해 주세요.';
  }
}
