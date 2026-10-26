import { Image } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import type { SizedAsset } from '@/constants/assets';

type IconProps = {
  icon: SizedAsset;
  /** Side of the square box the vector is centred in. Defaults to the vector's own size. */
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Icon({ icon, size, style }: IconProps) {
  const box = size ?? Math.max(icon.width, icon.height);

  return (
    <View style={[styles.box, { width: box, height: box }, style]}>
      <Image
        source={icon.source}
        style={{ width: icon.width, height: icon.height }}
        contentFit="contain"
        accessible={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});
