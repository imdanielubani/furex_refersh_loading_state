import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

const WIDTH = 124.415;
const HEIGHT = 106.54;

// [source, left, top, width, height] in paint order. Each part keeps its
// intrinsic SVG size so the composed illustration stays sharp at any density.
const PARTS: readonly [number, number, number, number, number][] = [
  [require('../../../assets/images/binoculars/part-01.svg'), 61.12, 15.36, 33.7978, 23.8719],
  [require('../../../assets/images/binoculars/part-02.svg'), 87.26, 18.6, 13.0936, 11.6539],
  [require('../../../assets/images/binoculars/part-03.svg'), 21.4, 40.35, 48.1177, 31.9034],
  [require('../../../assets/images/binoculars/part-04.svg'), 52.82, 79.17, 51.4057, 27.3654],
  [require('../../../assets/images/binoculars/part-05.svg'), 13.64, 13.47, 39.5628, 44.4971],
  [require('../../../assets/images/binoculars/part-06.svg'), 42.95, 14.23, 3.49152, 18.5169],
  [require('../../../assets/images/binoculars/part-07.svg'), 16.18, 23.03, 62.4505, 66.5467],
  [require('../../../assets/images/binoculars/part-08.svg'), 20.05, 33.44, 38.621, 53.8772],
  [require('../../../assets/images/binoculars/part-09.svg'), 40.37, 7.97, 7.00825, 7.35548],
  [require('../../../assets/images/binoculars/part-10.svg'), 40.54, 13.54, 4.21204, 7.22631],
  [require('../../../assets/images/binoculars/part-11.svg'), 40.94, 10.23, 5.79404, 6.84623],
  [require('../../../assets/images/binoculars/part-12.svg'), 41.36, 11.91, 5.36798, 5.70355],
  [require('../../../assets/images/binoculars/part-13.svg'), 43.56, 15.11, 1.9323, 0.928403],
  [require('../../../assets/images/binoculars/part-14.svg'), 14.55, 52.97, 4.69356, 4.90867],
  [require('../../../assets/images/binoculars/part-15.svg'), 41.33, 18.62, 2.43634, 2.47093],
  [require('../../../assets/images/binoculars/part-16.svg'), 40.16, 14.85, 2.56434, 6.44726],
  [require('../../../assets/images/binoculars/part-17.svg'), 41.96, 17.08, 2.56697, 3.69543],
  [require('../../../assets/images/binoculars/part-18.svg'), 36.96, 20.92, 7.30311, 16.2533],
  [require('../../../assets/images/binoculars/part-19.svg'), 38.76, 24.22, 5.17995, 7.48988],
  [require('../../../assets/images/binoculars/part-20.svg'), 29.56, 15.27, 11.2963, 27.687],
  [require('../../../assets/images/binoculars/part-21.svg'), 44.09, 7.96, 15.3616, 10.2111],
  [require('../../../assets/images/binoculars/part-22.svg'), 45.56, 1.35, 38.0907, 25.1011],
  [require('../../../assets/images/binoculars/part-23.svg'), 83.15, 0, 30.6227, 25.1541],
  [require('../../../assets/images/binoculars/part-24.svg'), 92.3, 6.4, 11.3199, 7.66457],
  [require('../../../assets/images/binoculars/part-25.svg'), 89.2, 6.87, 6.96488, 10.829],
  [require('../../../assets/images/binoculars/part-26.svg'), 100.06, 6.4, 6.96487, 10.829],
  [require('../../../assets/images/binoculars/part-27.svg'), 101.25, 0.07, 23.1659, 25.1081],
  [require('../../../assets/images/binoculars/part-28.svg'), 71.67, 1.34, 23.1659, 25.1081],
  [require('../../../assets/images/binoculars/part-29.svg'), 90.13, 19.39, 7.79875, 5.91862],
  [require('../../../assets/images/binoculars/part-30.svg'), 39.15, 26.18, 8.92332, 10.9432],
  [require('../../../assets/images/binoculars/part-31.svg'), 0.77, 17, 31.9948, 12.966],
  [require('../../../assets/images/binoculars/part-32.svg'), 35.78, 2.32, 33.5284, 29.4774],
  [require('../../../assets/images/binoculars/part-33.svg'), 0, 18.42, 43.9371, 19.9664],
  [require('../../../assets/images/binoculars/part-34.svg'), 62.14, 2.58, 3.3038, 1.79595],
  [require('../../../assets/images/binoculars/part-35.svg'), 59.33, 2.32, 3.73138, 1.93084],
  [require('../../../assets/images/binoculars/part-36.svg'), 56.06, 3.27, 2.44003, 1.36352],
  [require('../../../assets/images/binoculars/part-37.svg'), 33.97, 32.54, 3.92064, 3.92064],
  [require('../../../assets/images/binoculars/part-38.svg'), 35.39, 33.51, 1.07172, 1.96197],
  [require('../../../assets/images/binoculars/part-39.svg'), 88.66, 1.03, 10.1438, 5.97228],
  [require('../../../assets/images/binoculars/part-40.svg'), 90.48, 2.56, 1.77751, 2.11472],
  [require('../../../assets/images/binoculars/part-41.svg'), 86.74, 29.2, 3.75644, 3.75644],
  [require('../../../assets/images/binoculars/part-42.svg'), 88.15, 30.48, 0.895793, 1.28982],
];

export const BinocularsIllustration = memo(function BinocularsIllustration() {
  return (
    <View style={styles.canvas}>
      {PARTS.map(([source, left, top, width, height], index) => (
        <Image key={index} source={source} style={[styles.part, { left, top, width, height }]} contentFit="fill" />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  canvas: {
    width: WIDTH,
    height: HEIGHT,
    pointerEvents: 'none',
  },
  part: {
    position: 'absolute',
  },
});
