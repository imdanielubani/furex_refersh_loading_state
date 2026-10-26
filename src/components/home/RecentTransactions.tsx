import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BinocularsIllustration } from '@/components/home/BinocularsIllustration';
import { Icon } from '@/components/ui/Icon';
import { icons } from '@/constants/assets';
import { colors, type } from '@/constants/theme';

export function RecentTransactions({ onSeeAllPress }: { onSeeAllPress?: () => void }) {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.heading} accessibilityRole="header">
          Recent Transactions
        </Text>
        <Pressable
          onPress={onSeeAllPress}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="See all transactions"
          style={({ pressed }) => [styles.seeAll, pressed && styles.pressed]}
        >
          <Text style={styles.seeAllText}>See all</Text>
          <Icon icon={icons.arrowRight} size={24} style={styles.arrow} />
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.empty}>
          <BinocularsIllustration />
          <View style={styles.emptyCopy}>
            <Text style={styles.emptyTitle}>No transaction yet</Text>
            <Text style={styles.emptyBody}>Start using the Furex app and see your transactions here</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 15.41,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  heading: {
    ...type.semiBold,
    fontSize: 15.41,
    lineHeight: 19.262,
    color: colors.textPrimary,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  seeAllText: {
    ...type.semiBold,
    fontSize: 15.41,
    lineHeight: 19.262,
    color: colors.brand,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
  },
  card: {
    minHeight: 243,
    alignItems: 'center',
    paddingTop: 35.59,
    borderRadius: 30.326,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  empty: {
    width: 219,
    alignItems: 'center',
    gap: 10,
  },
  emptyCopy: {
    alignSelf: 'stretch',
    gap: 9,
  },
  emptyTitle: {
    ...type.semiBold,
    fontSize: 13,
    letterSpacing: 0.15,
    textAlign: 'center',
    color: colors.neutral900,
  },
  emptyBody: {
    ...type.regular,
    fontSize: 12,
    letterSpacing: 0.15,
    textAlign: 'center',
    color: colors.neutral300,
  },
  pressed: {
    opacity: 0.6,
  },
});
