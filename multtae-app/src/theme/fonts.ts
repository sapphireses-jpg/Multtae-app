/**
 * Font map for `useFonts`. Jua for display, Noto Sans KR (400/500/700) for body.
 * Matches the weights referenced by `type` in typography.ts.
 *
 * We `require` the specific .ttf files (not the package barrel) so Metro bundles
 * only these four faces instead of every Noto Sans KR weight (100–900, ~6MB each).
 */
export const appFonts = {
  Jua_400Regular: require('@expo-google-fonts/jua/400Regular/Jua_400Regular.ttf'),
  NotoSansKR_400Regular: require('@expo-google-fonts/noto-sans-kr/400Regular/NotoSansKR_400Regular.ttf'),
  NotoSansKR_500Medium: require('@expo-google-fonts/noto-sans-kr/500Medium/NotoSansKR_500Medium.ttf'),
  NotoSansKR_700Bold: require('@expo-google-fonts/noto-sans-kr/700Bold/NotoSansKR_700Bold.ttf'),
};
