import { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { PROMO_BANNER_HEIGHT, PromoBanner, type Promo } from '@/components/home/PromoBanner';
import { Icon } from '@/components/ui/Icon';
import { icons } from '@/constants/assets';
import { colors } from '@/constants/theme';

type PromoCarouselProps = {
  promos: Promo[];
  onPromoPress?: (promo: Promo) => void;
};

export function PromoCarousel({ promos, onPromoPress }: PromoCarouselProps) {
  const [pageWidth, setPageWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setPageWidth(event.nativeEvent.layout.width);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (pageWidth === 0) return;
    const index = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    setActiveIndex(Math.min(Math.max(index, 0), promos.length - 1));
  };

  const renderItem = useCallback<ListRenderItem<Promo>>(
    ({ item }) => (
      <View style={[styles.page, { width: pageWidth }]}>
        <PromoBanner promo={item} onPress={onPromoPress && (() => onPromoPress(item))} />
      </View>
    ),
    [pageWidth, onPromoPress],
  );

  return (
    <View style={styles.container}>
      {/* Pages are sized from the measured width, so render a same-height spacer until then. */}
      <View style={styles.viewport} onLayout={handleLayout}>
        {pageWidth > 0 && (
          <FlatList
            data={promos}
            keyExtractor={(promo) => promo.id}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({ length: pageWidth, offset: pageWidth * index, index })}
          />
        )}
      </View>
      {promos.length > 1 && <PageDots count={promos.length} activeIndex={activeIndex} />}
    </View>
  );
}

function PageDots({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <View style={styles.dots} accessible accessibilityLabel={`Promotion ${activeIndex + 1} of ${count}`}>
      {Array.from({ length: count }, (_, index) =>
        index === activeIndex ? (
          <View key={index} style={styles.activeDot} />
        ) : (
          <Icon key={index} icon={icons.pageDot} />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  viewport: {
    height: PROMO_BANNER_HEIGHT,
  },
  page: {
    paddingHorizontal: 5,
  },
  dots: {
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  activeDot: {
    width: 12,
    height: 7.2,
    borderRadius: 300,
    backgroundColor: colors.brandAccent,
  },
});
