import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { BalancePattern } from '@/components/home/BalancePattern';
import { Icon } from '@/components/ui/Icon';
import { icons, type SizedAsset } from '@/constants/assets';
import { colors, type } from '@/constants/theme';
import { NAIRA_SYMBOL, formatAmount, formatNaira } from '@/utils/formatCurrency';

type BalanceCardProps = {
  balance: number;
  onCurrencyPress?: () => void;
  onDepositPress?: () => void;
  onTradePress?: () => void;
  onWithdrawPress?: () => void;
};

export function BalanceCard({
  balance,
  onCurrencyPress,
  onDepositPress,
  onTradePress,
  onWithdrawPress,
}: BalanceCardProps) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.hero}>
        <BalancePattern />

        <View style={styles.heroContent}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Total Balance</Text>
            <Pressable
              onPress={() => setIsHidden((hidden) => !hidden)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={isHidden ? 'Show balance' : 'Hide balance'}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Icon icon={icons.eyeAlt} />
            </Pressable>
          </View>

          <View style={styles.amountRow}>
            <Text
              style={styles.amount}
              numberOfLines={1}
              accessibilityLabel={isHidden ? 'Balance hidden' : formatNaira(balance)}
            >
              <Text style={styles.nairaSymbol}>{NAIRA_SYMBOL}</Text>
              {isHidden ? '*******' : formatAmount(balance)}
            </Text>
            <Pressable
              onPress={onCurrencyPress}
              accessibilityRole="button"
              accessibilityLabel="Currency, Nigerian naira"
              style={({ pressed }) => [styles.currencyPill, pressed && styles.pressed]}
            >
              <Icon icon={icons.flagNg} />
              <View style={styles.currencyLabel}>
                <Text style={styles.currencyText}>NGN</Text>
                <Icon icon={icons.arrowDown} size={19.821} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <ActionButton icon={icons.arrowCircleDownLeft} label="Deposit" onPress={onDepositPress} tone="surface" />
        <ActionButton icon={icons.refreshCcw} label="Trade" onPress={onTradePress} />
        <ActionButton
          icon={icons.arrowCircleDownRight}
          label="Withdraw"
          onPress={onWithdrawPress}
          iconStyle={styles.withdrawIcon}
        />
      </View>
    </View>
  );
}

type ActionButtonProps = {
  icon: SizedAsset;
  label: string;
  onPress?: () => void;
  tone?: 'surface' | 'white';
  iconStyle?: ViewStyle;
};

function ActionButton({ icon, label, onPress, tone = 'white', iconStyle }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.actionButton,
        tone === 'surface' && styles.actionButtonSurface,
        pressed && styles.pressed,
      ]}
    >
      <Icon icon={icon} size={24} style={[styles.noShrink, iconStyle]} />
      <Text style={styles.actionLabel} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 9.584,
    paddingTop: 13,
    paddingLeft: 15.5,
    paddingRight: 17,
    paddingBottom: 7.5,
    borderRadius: 30.488,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  hero: {
    height: 136.096,
    paddingTop: 34.87,
    paddingLeft: 16.66,
    paddingRight: 16.88,
    borderRadius: 24.654,
    overflow: 'hidden',
    backgroundColor: colors.brand,
  },
  heroContent: {
    gap: 10.543,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5.751,
  },
  title: {
    ...type.semiBold,
    fontSize: 14.61,
    lineHeight: 18.262,
    color: colors.textPrimary,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  amount: {
    ...type.extraBold,
    flexShrink: 1,
    fontSize: 23.002,
    letterSpacing: 0.137,
    color: colors.textPrimary,
  },
  nairaSymbol: {
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: 'system-ui, sans-serif' }),
    fontWeight: '800',
  },
  currencyPill: {
    height: 24.919,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.303,
    paddingHorizontal: 6.607,
    borderRadius: 26.428,
    backgroundColor: colors.currencyPill,
  },
  currencyLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.303,
  },
  currencyText: {
    ...type.semiBold,
    fontSize: 9.91,
    lineHeight: 16.517,
    color: colors.black,
  },
  actions: {
    flexDirection: 'row',
    gap: 9.584,
    marginRight: 8.2,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5.479,
    padding: 9.957,
    borderWidth: 0.913,
    borderColor: colors.borderTertiary,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  actionButtonSurface: {
    backgroundColor: colors.surface,
  },
  actionLabel: {
    ...type.regular,
    flexShrink: 0,
    fontWeight: 900,
    fontSize: 11.418,
    lineHeight: 20.089,
    letterSpacing: -0.1644,
    color: colors.textSlate,
  },
  noShrink: {
    flexShrink: 0,
  },
  withdrawIcon: {
    transform: [{ rotate: '-90deg' }],
  },
  pressed: {
    opacity: 0.7,
  },
});
