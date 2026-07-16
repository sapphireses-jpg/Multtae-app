/**
 * 5탭 GNB (`.gnb`) — 홈 · 도감 · 등록 · 피드 · 프로필.
 * 등록은 중앙에서 위로 떠 있는 52px 블루 플로팅 버튼 + 컬러 섀도.
 * 흰 배경 + 상단 1px 보더 (DS v2: 반투명+blur 대신 화이트 근사).
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ds2Colors as c, ds2Radii, ds2Shadows, ds2Text } from '../../theme/ds2';
import { PlusIcon, TabBookIcon, TabFeedIcon, TabHomeIcon, TabProfileIcon } from './icons';

export type GnbTab = 'home' | 'encyclopedia' | 'register' | 'feed' | 'profile';

const TABS: { key: GnbTab; label: string; Icon: typeof TabHomeIcon }[] = [
  { key: 'home', label: '홈', Icon: TabHomeIcon },
  { key: 'encyclopedia', label: '도감', Icon: TabBookIcon },
  { key: 'register', label: '등록', Icon: TabHomeIcon /* unused — FAB 전용 렌더 */ },
  { key: 'feed', label: '피드', Icon: TabFeedIcon },
  { key: 'profile', label: '프로필', Icon: TabProfileIcon },
];

export function Gnb({
  active,
  bottomInset = 0,
  onPressTab,
}: {
  active: GnbTab;
  /** 홈 인디케이터 safe-area. 프로토타입 기본값은 30. */
  bottomInset?: number;
  onPressTab?: (tab: GnbTab) => void;
}) {
  return (
    <View style={[styles.gnb, { paddingBottom: Math.max(bottomInset, 30) }]}>
      {TABS.map(({ key, label, Icon }) => {
        if (key === 'register') {
          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityLabel="조과 등록"
              onPress={() => onPressTab?.(key)}
              style={styles.tab}
            >
              <View style={styles.plusCircle}>
                <PlusIcon size={25} color={c.white} strokeWidth={2.7} />
              </View>
              <Text style={[styles.tabLabel, styles.registerLabel]}>{label}</Text>
            </Pressable>
          );
        }
        const isActive = key === active;
        const color = isActive ? c.brand : c.muted;
        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onPressTab?.(key)}
            style={styles.tab}
          >
            <Icon color={color} />
            <Text style={[styles.tabLabel, { color }, isActive && styles.tabLabelActive]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  gnb: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: c.border,
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
  tab: {
    flex: 1,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: { ...ds2Text('semibold', 11, 16), color: c.muted },
  tabLabelActive: { fontFamily: 'NotoSansKR_700Bold' },
  registerLabel: { color: c.brandActive, fontFamily: 'NotoSansKR_700Bold' },
  plusCircle: {
    width: 52,
    height: 52,
    marginTop: -26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: c.white,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.brand,
    ...ds2Shadows.brand,
  },
});
