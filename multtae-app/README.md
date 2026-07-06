# 물때 (Multtae) — Login

Expo (managed) + React Native + TypeScript implementation of the **Multtae login
screen**, built from the Claude Design handoff in `../project`. "Light liquid
glass" visual system: lavender-blue gradient, floating liquid blobs, translucent
white glass panels, brand-blue actions.

Auth is **social-login only** (Kakao → Google → Apple) via **Supabase Auth**.
No email/password, no phone, no separate consent step — social login *is* sign-up.

## Screens

| Screen | File | Notes |
| --- | --- | --- |
| Login | `src/screens/LoginScreen.tsx` | Value prop → inline error → 3 social buttons → "로그인 없이 둘러보기" → clickwrap notice (final order from the design chat). |
| Tour carousel | `src/components/TourCarousel.tsx` | 3 swipeable glass-card slides (물때 곡선 · 조과 기록 · 출조 알림). Auto-shows once on first launch (device-stored flag `@multtae/tour_seen`); afterwards reachable via the login-screen link. Skip / 시작하기 return to login. |
| Legal sheet | `src/components/LegalSheet.tsx` | 이용약관 / 개인정보처리방침 open as a 78%-height in-app webview bottom sheet. |
| Post-login stub | `src/screens/PostLoginPlaceholder.tsx` | Confirms the session; the real cold-start (nickname → "check the fish you've caught") is a follow-up screen. |

## Login states

- **Loading** — the tapped provider shows a spinner ("로그인 중…"); the other two disable to 40%.
- **Inline error** — mapped from the auth outcome, shown just above the buttons
  (canonical wording from the Login_BeforeMain spec, 오류·예외 상태 표):
  - `로그인을 취소했어요.` (OAuth 인증 취소)
  - `네트워크 연결을 확인한 뒤 다시 시도해 주세요.` (네트워크 오류)
  - `로그인에 실패했어요. 잠시 후 다시 시도해 주세요.` (소셜 제공자 인증 실패)
  - `계정을 불러오지 못했어요. 다시 시도해 주세요.` (서버 계정 처리 실패)

## Design system

Tokens are ported 1:1 from `../project/_ds/.../tokens/*.css`:

- `src/theme/tokens.ts` — colors, radii, spacing, blur, shadows, motion
- `src/theme/typography.ts` — Jua (display) + Noto Sans KR (body) type scale
- `src/theme/fonts.ts` — the four font faces actually used (400/500/700 + Jua)

RN has no `backdrop-filter` / `radial-gradient`, so: glass surfaces use
`expo-blur`, the background blobs use SVG radial gradients (color → transparent)
drifting on a slow loop, and the bg gradient uses `expo-linear-gradient`.

## Getting started

```bash
npm install
cp .env.example .env      # fill in your Supabase URL + anon key
npx expo start            # press i (iOS) / a (Android)
```

**Without a `.env`** the app runs in **mock mode**: sign-in resolves after a
1.6s delay so you can exercise the loading and error states. Set
`EXPO_PUBLIC_MOCK_OUTCOME=success|cancelled|network|failed` to pick the mocked
result (default `network`). In dev builds a notice banner on the login screen
points at the missing config.

### Environment variables

Copy `.env.example` to `.env`. Only `EXPO_PUBLIC_*`-prefixed vars are exposed
to the app bundle (Expo rule); they are inlined **at bundle time**, so after
editing `.env` restart with a cleared cache: `npx expo start -c`.

| Variable | Required | Description |
| --- | --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | for real auth | Supabase project URL (`https://<project>.supabase.co`) |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | for real auth | Supabase anon (public) key — safe in the client, data is guarded by RLS |
| `EXPO_PUBLIC_MOCK_OUTCOME` | no | Mock-mode sign-in outcome: `success` / `cancelled` / `network` / `failed` |

### Troubleshooting

- **`[runtime not ready]: Error: supabaseUrl is required.`** — the env vars
  weren't picked up. Make sure `.env` exists next to `package.json`, the names
  start with `EXPO_PUBLIC_`, and restart Metro with `npx expo start -c`.
  (Since the null-client fallback the app no longer crashes on missing config —
  if you still see this, you're running an old bundle; clear the cache.)

## Supabase setup

1. Create a Supabase project; put its URL + anon key in `.env`.
2. Enable the **Kakao**, **Google**, and **Apple** providers under
   *Authentication → Providers* and add each provider's client credentials.
3. Add the redirect URL `multtae://auth-callback` (the app's deep-link `scheme`,
   see `app.json`) to *Authentication → URL Configuration → Redirect URLs*.
4. iOS Apple sign-in uses the native sheet (`expo-apple-authentication`,
   `ios.usesAppleSignIn`); Kakao/Google use the Supabase OAuth web flow via
   `expo-web-browser`.

Requires a development build or Expo Go with the config plugins applied
(`npx expo prebuild` for a bare workflow / EAS build).
