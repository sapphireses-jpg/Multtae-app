/**
 * Terms / privacy in-app webview sheet. Clickwrap links open this bottom sheet
 * (78% height) instead of navigating away. Body is the prototype's placeholder;
 * swap the placeholder for a real <WebView> pointed at the hosted doc.
 */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { colors, radii, shadows } from '../theme/tokens';
import { type } from '../theme/typography';
import { CloseIcon, DocIcon } from './icons';

export type LegalKind = 'terms' | 'privacy';

const TITLES: Record<LegalKind, string> = {
  terms: '이용약관',
  privacy: '개인정보처리방침',
};

export function LegalSheet({
  kind,
  onClose,
}: {
  kind: LegalKind | null;
  onClose: () => void;
}) {
  const { height } = useWindowDimensions();
  const visible = kind !== null;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, anim]);

  const title = kind ? TITLES[kind] : '';
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [height, 0] });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: anim }]}>
          <Pressable style={[StyleSheet.absoluteFill, styles.scrim]} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="닫기"
              onPress={onClose}
              style={styles.closeBtn}
            >
              <CloseIcon size={14} />
            </Pressable>
          </View>

          <View style={styles.body}>
            <DocIcon size={32} />
            <Text style={styles.placeholder}>인앱 웹뷰 — {title} 문서가 열립니다</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  scrim: { backgroundColor: colors.scrim },
  sheet: {
    height: '78%',
    backgroundColor: colors.white,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    ...shadows.sheet,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.06)',
  },
  title: { ...type.headlineSm, color: colors.ink },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  placeholder: { ...type.labelMd, color: colors.muted },
});
