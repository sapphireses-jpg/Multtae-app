/**
 * Font map for `useFonts`. Jua for display (v1 screens), Noto Sans KR
 * (400/500/600/700) for body. 600 SemiBold was added for DS v2 ("클린 화이트")
 * screens, whose hierarchy leans on the 500/600 weight step.
 *
 * We `require` the specific .ttf files (not the package barrel) so Metro bundles
 * only these faces instead of every Noto Sans KR weight (100–900, ~6MB each).
 */
export const appFonts = {
  Jua_400Regular: require('@expo-google-fonts/jua/400Regular/Jua_400Regular.ttf'),
  NotoSansKR_400Regular: require('@expo-google-fonts/noto-sans-kr/400Regular/NotoSansKR_400Regular.ttf'),
  NotoSansKR_500Medium: require('@expo-google-fonts/noto-sans-kr/500Medium/NotoSansKR_500Medium.ttf'),
  NotoSansKR_600SemiBold: require('@expo-google-fonts/noto-sans-kr/600SemiBold/NotoSansKR_600SemiBold.ttf'),
  NotoSansKR_700Bold: require('@expo-google-fonts/noto-sans-kr/700Bold/NotoSansKR_700Bold.ttf'),
};
