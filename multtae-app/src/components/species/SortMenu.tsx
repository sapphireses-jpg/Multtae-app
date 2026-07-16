/**
 * 정렬 pill + 선택 시트. 프로토타입은 네이티브 `<select>`라 시각 스펙이
 * 없으므로, 트리거 pill(`.sort-select`)만 스펙대로 맞추고 옵션 선택은
 * 필터와 같은 바텀시트 문법을 재사용한다.
 */
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ds2Colors as c, ds2Radii, ds2Text } from '../../theme/ds2';
import { SortChevronIcon } from './icons';

export type SortKey = 'recent' | 'name' | 'rank';

export const SORT_LABELS: Record<SortKey, string> = {
  recent: '최근 잡은 순',
  name: '이름 순',
  rank: '랭킹 순',
};

const SORT_KEYS: SortKey[] = ['recent', 'name', 'rank'];

export function SortMenu({ value, onChange }: { value: SortKey; onChange: (key: SortKey) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`정렬 순서: ${SORT_LABELS[value]}`}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [styles.trigger, pressed && { backgroundColor: c.pressed }]}
      >
        <Text style={styles.triggerLabel}>{SORT_LABELS[value]}</Text>
        <SortChevronIcon />
      </Pressable>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />
            <Text accessibilityRole="header" style={styles.title}>
              정렬 순서
            </Text>
            {SORT_KEYS.map((key) => {
              const active = key === value;
              return (
                <Pressable
                  key={key}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  onPress={() => {
                    onChange(key);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [styles.row, pressed && { backgroundColor: c.tint }]}
                >
                  <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>
                    {SORT_LABELS[key]}
                  </Text>
                  {active ? <View style={styles.activeDot} /> : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: c.borderStrong,
    borderRadius: ds2Radii.pill,
    backgroundColor: c.canvas,
  },
  triggerLabel: { ...ds2Text('medium', 13, 19), color: c.ink },
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
  title: {
    ...ds2Text('semibold', 16, 23),
    color: c.ink,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    borderRadius: ds2Radii.stage,
  },
  rowLabel: { ...ds2Text('medium', 15, 22), color: c.body },
  rowLabelActive: { ...ds2Text('semibold', 15, 22), color: c.brandActive },
  activeDot: { width: 8, height: 8, borderRadius: ds2Radii.pill, backgroundColor: c.brand },
});
