import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBottomNavHeight } from '@/components/navigation/BottomNav';
import { colors, type } from '@/constants/theme';

/** Stand-in for tabs whose screens have not been built yet. */
export function PlaceholderScreen({ title }: { title: string }) {
  const { top } = useSafeAreaInsets();
  const navHeight = useBottomNavHeight();

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: navHeight }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    ...type.semiBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
