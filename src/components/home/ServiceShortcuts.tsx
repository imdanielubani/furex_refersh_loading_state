import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { icons, type SizedAsset } from '@/constants/assets';
import { colors, type } from '@/constants/theme';

export type ServiceId = 'crypto' | 'giftcards' | 'paybills' | 'rate';

const SERVICES: { id: ServiceId; label: string; icon: SizedAsset; tint: string }[] = [
  { id: 'crypto', label: 'Crypto', icon: icons.coins, tint: colors.serviceCrypto },
  { id: 'giftcards', label: 'Giftcards', icon: icons.giftCard, tint: colors.serviceGiftcards },
  { id: 'paybills', label: 'Paybills', icon: icons.invoice, tint: colors.servicePaybills },
  { id: 'rate', label: 'Rate', icon: icons.analyticsUp, tint: colors.serviceRate },
];

const CIRCLE_SIZE = 45;

const COLUMN_WIDTH = CIRCLE_SIZE + 44;

export function ServiceShortcuts({ onServicePress }: { onServicePress?: (id: ServiceId) => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {SERVICES.map((service) => (
          <Pressable
            key={service.id}
            onPress={() => onServicePress?.(service.id)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          >
            <View style={[styles.circle, { backgroundColor: service.tint }]}>
              <Icon icon={service.icon} size={24} />
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {service.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 113.376,
    alignItems: 'center',
    paddingTop: 16.8,
    borderWidth: 0.953,
    borderColor: colors.borderYellowish,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 1,
  },
  item: {
    width: COLUMN_WIDTH,
    alignItems: 'center',
    gap: 9,
  },
  circle: {
    width: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10.227,
    borderRadius: CIRCLE_SIZE,
  },
  label: {
    ...type.semiBold,
    fontSize: 12,
    letterSpacing: 0.147,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
});
