import { Image } from 'expo-image';
import { TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/Icon';
import { icons, images, type SizedAsset } from '@/constants/assets';
import { colors } from '@/constants/theme';

const BUTTON_SIZE = 52;
const PILL_PADDING = 8;
const PILL_HEIGHT = BUTTON_SIZE + PILL_PADDING * 2;
const SPACE_ABOVE_PILL = 21;

// Names must match the triggers registered in app/(tabs)/_layout.tsx.
const TABS: { name: string; label: string; icon: SizedAsset; iconSize?: number }[] = [
  { name: 'index', label: 'Home', icon: icons.furexMark },
  { name: 'wallet', label: 'Wallet', icon: icons.wallet, iconSize: 24 },
  { name: 'giftcards', label: 'Giftcards', icon: icons.giftCardNav, iconSize: 24 },
  { name: 'cards', label: 'Cards', icon: icons.creditCard, iconSize: 24 },
  { name: 'profile', label: 'Profile', icon: icons.circleUser, iconSize: 24 },
];

function usePillBottomOffset() {
  const { bottom } = useSafeAreaInsets();
  // The pill sits slightly into the home indicator area on gesture-nav devices.
  return bottom > 0 ? 28.22 : 16;
}

/** Height the nav covers at the bottom of the screen; scrollable screens pad by this. */
export function useBottomNavHeight() {
  return SPACE_ABOVE_PILL + PILL_HEIGHT + usePillBottomOffset();
}

export function BottomNav() {
  const height = useBottomNavHeight();
  const pillBottom = usePillBottomOffset();

  return (
    <View style={[styles.container, { height }]}>
      <Image source={images.navScribble} style={styles.scribble} contentFit="fill" accessible={false} />
      <View style={[styles.pill, { bottom: pillBottom }]} accessibilityRole="tablist">
        {TABS.map((tab) => (
          <TabTrigger key={tab.name} name={tab.name} asChild>
            <NavButton icon={tab.icon} iconSize={tab.iconSize} accessibilityLabel={tab.label} />
          </TabTrigger>
        ))}
      </View>
    </View>
  );
}

// expo-router types the slot ref against an older View type than RN 0.88's.
// React 19 still forwards it at runtime through the props spread.
type NavButtonProps = Omit<TabTriggerSlotProps, 'ref'> & {
  icon: SizedAsset;
  iconSize?: number;
};

function NavButton({ icon, iconSize, isFocused, style: _style, ...props }: NavButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => [styles.button, isFocused && styles.buttonFocused, pressed && styles.pressed]}
    >
      <Icon icon={icon} size={iconSize} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  scribble: {
    position: 'absolute',
    top: '-325.04%',
    bottom: '-277.94%',
    left: '-2%',
    right: '-2.74%',
  },
  pill: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: PILL_PADDING,
    borderRadius: 44,
    backgroundColor: colors.black,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.navButton,
  },
  buttonFocused: {
    backgroundColor: colors.brand,
  },
  pressed: {
    opacity: 0.8,
  },
});
