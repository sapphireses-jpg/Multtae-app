/**
 * 도감 필터 바텀시트 (`.sheet-backdrop` / `.filter-sheet`).
 * 옵션 pill은 선택 시 잉크(#191C1E) 배경/흰 글자 (블루 아님 — DS v2 규칙).
 * 적용하기를 눌러야 목록에 반영되고, 초기화는 체크만 해제한다(프로토타입 동작).
 */
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ds2Colors as c, ds2Radii, ds2Text } from '../../theme/ds2';
import { SheetCloseIcon } from './icons';

export type FilterKey = 'collected' | 'uncollected' | 'fish' | 'cephalopod' | 'hideClosed';

export const FILTER_LABELS: Record<FilterKey, string> = {
  collected: '수집 완료',
  uncollected: '미수집',
  fish: '어류',
  cephalopod: '두족류',
  hideClosed: '금어기 제외',
};

const GROUPS: { title: string; keys: FilterKey[] }[] = [
  { title: '수집 상태', keys: ['collected', 'uncollected'] },
  { title: '어종 분류', keys: ['fish', 'cephalopod'] },
  { title: '기타', keys: ['hideClosed'] },
];

interface FilterSheetProps {
  visible: boolean;
  checked: FilterKey[];
  onToggle: (key: FilterKey) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

export function FilterSheet({ visible, checked, onToggle, onReset, onApply, onClose }: FilterSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable accessibilityLabel="필터 닫기" style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <Text accessibilityRole="header" style={styles.title}>
              도감 필터
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="필터 닫기"
              onPress={onClose}
              style={styles.closeBtn}
              hitSlop={6}
            >
              <SheetCloseIcon />
            </Pressable>
          </View>

          {GROUPS.map((group) => (
            <View key={group.title} style={styles.group}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <View style={styles.optionGrid}>
                {group.keys.map((key) => {
                  const active = checked.includes(key);
                  return (
                    <Pressable
                      key={key}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: active }}
                      onPress={() => onToggle(key)}
                      style={[styles.option, active && styles.optionActive]}
                    >
                      <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                        {FILTER_LABELS[key]}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}

          <View style={styles.actions}>
            <Pressable accessibilityRole="button" onPress={onReset} hitSlop={8}>
              <Text style={styles.resetLabel}>초기화</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onApply}
              style={({ pressed }) => [styles.applyBtn, pressed && { backgroundColor: c.brandActive }]}
            >
              <Text style={styles.applyLabel}>적용하기</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: c.scrim },
  sheet: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderTopLeftRadius: ds2Radii.sheet,
    borderTopRightRadius: ds2Radii.sheet,
    backgroundColor: c.canvas,
  },
  handle: {
    width: 40,
    height: 4,
    alignSelf: 'center',
    marginBottom: 14,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.borderStrong,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  title: { ...ds2Text('semibold', 16, 23), color: c.ink },
  closeBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  group: { marginTop: 20 },
  groupTitle: { ...ds2Text('semibold', 15, 22), color: c.ink },
  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  option: {
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: c.borderStrong,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.canvas,
  },
  optionActive: { borderColor: c.ink, backgroundColor: c.ink },
  optionLabel: { ...ds2Text('medium', 14, 20), color: c.ink },
  optionLabelActive: { color: c.white },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 26,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  resetLabel: {
    ...ds2Text('semibold', 15, 20),
    color: c.ink,
    textDecorationLine: 'underline',
  },
  applyBtn: {
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderRadius: ds2Radii.stage,
    backgroundColor: c.brand,
  },
  applyLabel: { ...ds2Text('semibold', 15, 20), color: c.white },
});
