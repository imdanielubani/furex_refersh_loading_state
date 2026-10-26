import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

type PillKind = 'short' | 'long' | 'tall';

const PILL_SIZE: Record<PillKind, { width: number; height: number }> = {
  short: { width: 82.249, height: 42.68 },
  long: { width: 141.158, height: 42.68 },
  tall: { width: 45.571, height: 77.032 },
};

// [kind, left, top] in paint order.
const PILLS: readonly [PillKind, number, number][] = [
  ['short', 15.13, 0], ['short', 43.44, 0], ['short', 71.74, 0], ['tall', 84.9, 0],
  ['long', 128.34, 0], ['short', 176.2, 0], ['long', 204.51, 0], ['long', 252.37, 0],
  ['tall', 0, 15.1], ['tall', 28.3, 15.1], ['long', 71.74, 15.1], ['short', 119.6, 15.1],
  ['short', 147.9, 15.1], ['long', 176.2, 15.1], ['long', 224.07, 15.1], ['tall', 256.8, 15.1],
  ['short', 15.13, 30.19], ['long', 43.44, 30.19], ['long', 91.3, 30.19], ['tall', 124.03, 30.19],
  ['long', 167.47, 30.19], ['short', 215.33, 30.19], ['short', 243.63, 30.19], ['short', 271.94, 30.19],
  ['tall', 0, 45.29], ['tall', 28.3, 45.29], ['tall', 56.6, 45.29], ['short', 100.04, 45.29],
  ['long', 128.34, 45.29], ['short', 176.2, 45.29], ['tall', 189.37, 45.29], ['long', 232.81, 45.29],
  ['long', 15.13, 60.39], ['tall', 47.87, 60.39], ['long', 91.3, 60.39], ['tall', 124.03, 60.39],
  ['tall', 152.33, 60.39], ['short', 195.77, 60.39], ['long', 224.07, 60.39], ['short', 271.94, 60.39],
  ['long', 15.13, 75.48], ['short', 63, 75.48], ['long', 91.3, 75.48], ['tall', 124.03, 75.48],
  ['tall', 152.33, 75.48], ['short', 195.77, 75.48], ['short', 224.07, 75.48], ['tall', 237.24, 75.48],
  ['tall', 0, 90.58], ['short', 43.44, 90.58], ['long', 71.74, 90.58], ['short', 119.6, 90.58],
  ['tall', 132.77, 90.58], ['tall', 161.07, 90.58], ['long', 204.51, 90.58], ['tall', 237.24, 90.58],
  ['tall', 0, 105.68], ['long', 43.44, 105.68], ['short', 91.3, 105.68], ['long', 119.6, 105.68],
  ['long', 167.47, 105.68], ['short', 215.33, 105.68], ['long', 243.63, 105.68], ['tall', 276.37, 105.68],
];

/** Decorative pill pattern behind the balance. Static, so it never re-renders. */
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
