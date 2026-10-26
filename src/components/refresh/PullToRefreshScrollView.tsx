import { useCallback, useState, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { GestureDetector, useNativeGesture, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { REFRESH_INDICATOR_SIZE, RefreshIndicator } from '@/components/refresh/RefreshIndicator';
import { inverseRubberBand, rubberBand } from '@/utils/pullPhysics';

// While refreshing, the indicator sits INDICATOR_TOP below the top of the
// scroll area with INDICATOR_GAP_BELOW between it and the content.
const INDICATOR_TOP = 20;
const INDICATOR_GAP_BELOW = 21;
const PULL_LIMIT = 240;
// Keeps the indicator up long enough to read as a refresh, even when the data is instant.
const MIN_REFRESH_MS = 800;

const SNAP_TO_HOLD = { duration: 400, dampingRatio: 0.8 } as const;
const SETTLE = { duration: 400, dampingRatio: 1, overshootClamping: true } as const;

type PullToRefreshScrollViewProps = {
  onRefresh: () => Promise<unknown>;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Space the content already leaves above its first item; the pull only adds the rest. */
  contentInsetTop?: number;
};

export function PullToRefreshScrollView({
  onRefresh,
  children,
  style,
  contentContainerStyle,
  contentInsetTop = 0,
}: PullToRefreshScrollViewProps) {
  const refreshDistance = INDICATOR_TOP + REFRESH_INDICATOR_SIZE + INDICATOR_GAP_BELOW - contentInsetTop;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollOffset(scrollRef);

  const pullDistance = useSharedValue(0);
  const fingerTravel = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const isRefreshing = useSharedValue(false);
  const [busy, setBusy] = useState(false);

  const runRefresh = useCallback(async () => {
    setBusy(true);
    // Errors belong to the data layer; the indicator always retracts.
    await Promise.allSettled([onRefresh(), new Promise((resolve) => setTimeout(resolve, MIN_REFRESH_MS))]);
    isRefreshing.set(false);
    if (!isDragging.get()) {
      pullDistance.set(withSpring(0, SETTLE));
    }
    setBusy(false);
  }, [onRefresh, isRefreshing, isDragging, pullDistance]);

  const nativeGesture = useNativeGesture({});

  const panGesture = usePanGesture({
    simultaneousWith: nativeGesture,
    activeOffsetY: [-8, 8],
    // A horizontal swipe belongs to the promo carousel, not the pull.
    failOffsetX: [-12, 12],
    onActivate: () => {
      'worklet';
      cancelAnimation(pullDistance);
      fingerTravel.set(inverseRubberBand(pullDistance.get(), PULL_LIMIT));
      isDragging.set(true);
    },
    onUpdate: (event) => {
      'worklet';
      // Only pull once the list is at the top, or to undo a pull already in progress.
      if (scrollY.get() > 0 && fingerTravel.get() <= 0) return;
      const travel = Math.max(0, fingerTravel.get() + event.changeY);
      fingerTravel.set(travel);
      pullDistance.set(rubberBand(travel, PULL_LIMIT));
      if (travel > 0) {
        // Keep the list pinned so it never scrolls and translates at once.
        scrollTo(scrollRef, 0, 0, false);
      }
    },
    onDeactivate: () => {
      'worklet';
      const distance = pullDistance.get();
      if (isRefreshing.get()) {
        pullDistance.set(withSpring(distance >= refreshDistance / 2 ? refreshDistance : 0, SNAP_TO_HOLD));
      } else if (distance >= refreshDistance) {
        isRefreshing.set(true);
        pullDistance.set(withSpring(refreshDistance, SNAP_TO_HOLD));
        scheduleOnRN(runRefresh);
      } else {
        pullDistance.set(withSpring(0, SETTLE));
      }
    },
    onFinalize: () => {
      'worklet';
      isDragging.set(false);
    },
  });

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pullDistance.get() }],
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pullDistance.get() - refreshDistance + INDICATOR_TOP }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container, style]} accessibilityState={{ busy }}>
        <GestureDetector gesture={nativeGesture}>
          <Animated.ScrollView
            ref={scrollRef}
            style={styles.container}
            // The pull replaces overscroll; native bounce would double the movement.
            bounces={false}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[contentContainerStyle, contentStyle]}>{children}</Animated.View>
            <RefreshIndicator
              pullDistance={pullDistance}
              triggerDistance={refreshDistance}
              refreshing={isRefreshing}
              style={[styles.indicator, indicatorStyle]}
            />
          </Animated.ScrollView>
        </GestureDetector>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
});
