import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { images } from '@/constants/assets';
import { colors, fonts, type } from '@/constants/theme';

export type Promo = {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: number;
};

export const PROMO_BANNER_HEIGHT = 114;

export function PromoBanner({ promo, onPress }: { promo: Promo; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${promo.title}${promo.highlight} ${promo.subtitle}`}
      style={({ pressed }) => [styles.banner, pressed && styles.pressed]}
    >
      <View style={StyleSheet.absoluteFill}>
        <Text style={[styles.letter, styles.letterU]} numberOfLines={1}>U</Text>
        <Text style={[styles.letter, styles.letterR]} numberOfLines={1}>R</Text>
        <Text style={[styles.letter, styles.letterE]} numberOfLines={1}>E</Text>
        <Text style={[styles.letter, styles.letterX]} numberOfLines={1}>X</Text>
        <Image source={images.promoWatermark1.source} style={[styles.watermark, styles.watermark1]} />
        <Image source={images.promoWatermark2.source} style={[styles.watermark, styles.watermark2]} />
        <Image source={images.promoWatermark3.source} style={[styles.watermark, styles.watermark3]} />
        <Image source={promo.image} style={styles.photo} contentFit="cover" />
      </View>

      <View style={styles.content}>
        <Image source={images.furexLogo} style={styles.logo} contentFit="cover" accessible={false} />
        <View style={styles.copy}>
          <Text style={styles.title}>
            {promo.title}
            <Text style={styles.highlight}>{promo.highlight}</Text>
          </Text>
          <Text style={styles.subtitle}>{promo.subtitle}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: PROMO_BANNER_HEIGHT,
    borderRadius: 23,
    overflow: 'hidden',
    backgroundColor: colors.black,
  },
  letter: {
    position: 'absolute',
    top: '-14.91%',
    bottom: '-14.04%',
    fontFamily: fonts.montserratBold,
    includeFontPadding: false,
    fontSize: 120.293,
    lineHeight: 147,
    color: 'rgba(255, 255, 255, 0.07)',
  },
  letterU: { left: '17.54%', right: '57.19%' },
  letterR: { left: '39.39%', right: '36.94%' },
  letterE: { left: '59.56%', right: '18.89%' },
  letterX: { left: '77.43%', right: '-0.31%' },
  watermark: {
    position: 'absolute',
    left: 0,
    opacity: 0.07,
  },
  watermark1: {
    top: '45.14%',
    width: images.promoWatermark1.width,
    height: images.promoWatermark1.height,
  },
  watermark2: {
    top: '16.76%',
    width: images.promoWatermark2.width,
    height: images.promoWatermark2.height,
  },
  watermark3: {
    top: '73.51%',
    width: images.promoWatermark3.width,
    height: images.promoWatermark3.height,
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: '65.16%',
    right: '3.19%',
    aspectRatio: 3277 / 4096,
    borderWidth: 1,
    borderColor: colors.black,
  },
  content: {
    position: 'absolute',
    left: 22,
    top: 22,
    width: 204,
    gap: 9,
  },
  logo: {
    width: 52,
    height: 17.121,
  },
  copy: {
    gap: 5,
  },
  title: {
    ...type.bold,
    fontSize: 12,
    color: colors.white,
  },
  highlight: {
    color: colors.brand,
  },
  subtitle: {
    ...type.regular,
    width: 157,
    fontSize: 10,
    color: colors.white,
  },
  pressed: {
    opacity: 0.9,
  },
});
