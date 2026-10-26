import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

type PillKind = 'short' | 'long' | 'tall';

const PILL_SIZE: Record<PillKind, { width: number; height: number }> = {
  short: { width: 82.249, height: 42.68 },
  long: { width: 141.158, height: 42.68 },
  tall: { width: 45.571, height: 77.032 },
};

const ROW = 45.4557;


const PILLS: readonly [PillKind, number, number][] = [
  ['short', 45.571, 0], ['short', 130.784, 0], ['short', 215.998, 0], ['tall', 255.64, 0],
  ['long', 386.424, 0], ['short', 530.546, 0], ['long', 615.76, 0], ['long', 759.881, 0],
  ['tall', 0, ROW], ['tall', 85.213, ROW], ['long', 215.998, ROW], ['short', 360.119, ROW],
  ['short', 445.333, ROW], ['long', 530.546, ROW], ['long', 674.668, ROW], ['tall', 773.219, ROW],
  ['short', 45.571, ROW * 2], ['long', 130.784, ROW * 2], ['long', 274.906, ROW * 2], ['tall', 373.457, ROW * 2],
  ['long', 504.241, ROW * 2], ['short', 648.363, ROW * 2], ['short', 733.576, ROW * 2], ['short', 818.79, ROW * 2],
  ['tall', 0, ROW * 3], ['tall', 85.213, ROW * 3], ['tall', 170.427, ROW * 3], ['short', 301.211, ROW * 3],
  ['long', 386.424, ROW * 3], ['short', 530.546, ROW * 3], ['tall', 570.189, ROW * 3], ['long', 700.973, ROW * 3],
  ['long', 45.571, ROW * 4], ['tall', 144.122, ROW * 4], ['long', 274.906, ROW * 4], ['tall', 373.457, ROW * 4],
  ['tall', 458.67, ROW * 4], ['short', 589.455, ROW * 4], ['long', 674.668, ROW * 4], ['short', 818.79, ROW * 4],
  ['long', 45.571, ROW * 5], ['short', 189.693, ROW * 5], ['long', 274.906, ROW * 5], ['tall', 373.457, ROW * 5],
  ['tall', 458.67, ROW * 5], ['short', 589.455, ROW * 5], ['short', 674.668, ROW * 5], ['tall', 714.31, ROW * 5],
  ['tall', 0, ROW * 6], ['short', 130.784, ROW * 6], ['long', 215.998, ROW * 6], ['short', 360.119, ROW * 6],
  ['tall', 399.762, ROW * 6], ['tall', 484.975, ROW * 6], ['long', 615.76, ROW * 6], ['tall', 714.31, ROW * 6],
  ['tall', 0, ROW * 7], ['long', 130.784, ROW * 7], ['short', 274.906, ROW * 7], ['long', 360.119, ROW * 7],
  ['long', 504.241, ROW * 7], ['short', 648.363, ROW * 7], ['long', 733.576, ROW * 7], ['tall', 832.127, ROW * 7],
];


export const BalancePattern = memo(function BalancePattern() {
  return (
    <View style={styles.overlay}>
      {PILLS.map(([kind, left, top], index) => (
        <View key={index} style={[styles.pill, PILL_SIZE[kind], { left, top }]} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: -45.05,
    top: -53.67,
    width: 478.252,
    height: 340.09,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  pill: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: colors.brandPattern,
  },
});
