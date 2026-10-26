import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/Icon';
import { icons, type SizedAsset } from '@/constants/assets';
import { colors, type } from '@/constants/theme';

type HomeHeaderProps = {
  name: string;
  avatar: number;
  verified?: boolean;
  onNotificationsPress?: () => void;
  onRewardsPress?: () => void;
  onMessagesPress?: () => void;
};

export function HomeHeader({
  name,
  avatar,
  verified = false,
  onNotificationsPress,
  onRewardsPress,
  onMessagesPress,
}: HomeHeaderProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Image source={avatar} style={styles.avatarImage} contentFit="cover" accessible={false} />
        </View>

        <View style={styles.identity}>
          <Text style={styles.welcome}>Welcome back!</Text>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            {verified && <Icon icon={icons.verified} size={18} />}
          </View>
        </View>

        <View style={styles.actions}>
          <HeaderAction icon={icons.bellRinging} label="Notifications" onPress={onNotificationsPress} />
          <HeaderAction icon={icons.gift} label="Rewards" onPress={onRewardsPress} />
          <HeaderAction icon={icons.messageCircleDots} label="Messages" onPress={onMessagesPress} />
        </View>
      </View>
    </View>
  );
}

function HeaderAction({ icon, label, onPress }: { icon: SizedAsset; label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Icon icon={icon} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBackground,
  },
  row: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 13,
    paddingLeft: 25,
    paddingRight: 19,
  },
  avatar: {
    width: 32,
    height: 32,
    marginTop: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.avatarPlaceholder,
  },
  avatarImage: {
    position: 'absolute',
    left: -0.5,
    top: -0.5,
    width: 36,
    height: 36,
  },
  identity: {
    flex: 1,
    marginLeft: 12,
  },
  welcome: {
    ...type.regular,
    fontSize: 12,
    color: colors.labelSecondary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  name: {
    ...type.semiBold,
    flexShrink: 1,
    fontSize: 14,
    letterSpacing: -0.154,
    color: colors.labelPrimary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginLeft: 12,
  },
  pressed: {
    opacity: 0.6,
  },
});
