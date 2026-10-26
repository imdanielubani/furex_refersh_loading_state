import { ScrollView, StyleSheet, View } from 'react-native';

import { BalanceCard } from '@/components/home/BalanceCard';
import { HomeHeader } from '@/components/home/HomeHeader';
import { PromoCarousel } from '@/components/home/PromoCarousel';
import { RecentTransactions } from '@/components/home/RecentTransactions';
import { ServiceShortcuts } from '@/components/home/ServiceShortcuts';
import { useBottomNavHeight } from '@/components/navigation/BottomNav';
import { colors } from '@/constants/theme';
import { currentUser, promos, walletBalance } from '@/data/dashboard';

export default function HomeScreen() {
  const navHeight = useBottomNavHeight();

  return (
    <View style={styles.screen}>
      <HomeHeader name={currentUser.name} avatar={currentUser.avatar} verified={currentUser.verified} />

      <ScrollView
        style={styles.scroll}
        // The bottom nav floats over the content, so the last card needs room to scroll clear of it.
        contentContainerStyle={[styles.content, { paddingBottom: navHeight + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.accountGroup}>
          <BalanceCard balance={walletBalance} />
          <ServiceShortcuts />
        </View>

        <View style={styles.feedGroup}>
          <PromoCarousel promos={promos} />
          <RecentTransactions />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: 15,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  accountGroup: {
    gap: 10,
  },
  feedGroup: {
    gap: 7,
  },
});
