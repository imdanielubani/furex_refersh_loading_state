import { Image } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type AnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import { icons, images } from '@/constants/assets';
import { colors } from '@/constants/theme';

export const REFRESH_INDICATOR_SIZE = 61;

const RING_INSET = (REFRESH_INDICATOR_SIZE - images.refreshRing.width) / 2;
// Ring angles from the two pull frames: it winds counter-clockwise as the pull arms.
const RING_ANGLE_AT_REST = 54.47;
const RING_ANGLE_ARMED = -12.66;
const SPIN_DURATION = 1000;

type RefreshIndicatorProps = {
  /** Current pull distance in points. */
  pullDistance: SharedValue<number>;
  /** Pull distance at which a refresh is armed; the ring completes its wind-up here. */
  triggerDistance: number;
  refreshing: SharedValue<boolean>;
  style?: StyleProp<AnimatedStyle<ViewStyle>>;
};

export function RefreshIndicator({ pullDistance, triggerDistance, refreshing, style }: RefreshIndicatorProps) {
  const reduceMotion = useReducedMotion();
  const spin = useSharedValue(0);
  const pulse = useSharedValue(1);

  useAnimatedReaction(
    () => refreshing.get(),
    (isRefreshing, wasRefreshing) => {
      if (!isRefreshing || wasRefreshing) return;
      if (reduceMotion) {
        pulse.set(withRepeat(withTiming(0.5, { duration: 600, easing: Easing.inOut(Easing.ease) }), -1, true));
      } else {
        spin.set(withRepeat(withTiming(-360, { duration: SPIN_DURATION, easing: Easing.linear }), -1, false));
      }
    },
    [reduceMotion],
  );

  // Reset only once the indicator is fully tucked away, so it never visibly snaps.
  useAnimatedReaction(
    () => !refreshing.get() && pullDistance.get() < 0.5,
    (isHidden, wasHidden) => {
      if (!isHidden || wasHidden) return;
      cancelAnimation(spin);
      cancelAnimation(pulse);
      spin.set(0);
      pulse.set(1);
    },
  );

  const containerStyle = useAnimatedStyle(() => ({
    opacity:
      interpolate(pullDistance.get(), [0, triggerDistance * 0.75], [0, 1], Extrapolation.CLAMP) * pulse.get(),
  }));

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.get()}deg` }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          pullDistance.get(),
          [0, triggerDistance],
          [RING_ANGLE_AT_REST, RING_ANGLE_ARMED],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  return (
    <Animated.View
      style={[styles.circle, containerStyle, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Animated.View style={[StyleSheet.absoluteFill, spinStyle]}>
        <Animated.View style={[styles.ring, ringStyle]}>
          <Image source={images.refreshRing.source} style={styles.ringImage} contentFit="contain" />
        </Animated.View>
        <View style={styles.markCircle}>
          <Image source={icons.refreshMark.source} style={styles.mark} contentFit="contain" />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: REFRESH_INDICATOR_SIZE,
    height: REFRESH_INDICATOR_SIZE,
    borderRadius: REFRESH_INDICATOR_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: colors.white,
    pointerEvents: 'none',
  },
  ring: {
    position: 'absolute',
    left: RING_INSET,
    top: RING_INSET,
    width: images.refreshRing.width,
    height: images.refreshRing.height,
  },
  ringImage: {
    width: images.refreshRing.width,
    height: images.refreshRing.height,
  },
  markCircle: {
    position: 'absolute',
    left: 14.64,
    top: 13.42,
    width: 32.94,
    height: 32.94,
    borderRadius: 32.94 / 2,
    overflow: 'hidden',
    backgroundColor: colors.brand,
  },
  mark: {
    position: 'absolute',
    left: 9.76,
    top: 6.88,
    width: icons.refreshMark.width,
    height: icons.refreshMark.height,
  },
});
