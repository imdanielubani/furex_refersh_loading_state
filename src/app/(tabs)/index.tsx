import { StyleSheet, View } from 'react-native';

import { BalanceCard } from '@/components/home/BalanceCard';
import { HomeHeader } from '@/components/home/HomeHeader';
import { PromoCarousel } from '@/components/home/PromoCarousel';
import { RecentTransactions } from '@/components/home/RecentTransactions';
import { ServiceShortcuts } from '@/components/home/ServiceShortcuts';
import { useBottomNavHeight } from '@/components/navigation/BottomNav';
import { PullToRefreshScrollView } from '@/components/refresh/PullToRefreshScrollView';
import { colors } from '@/constants/theme';
import { useDashboard } from '@/hooks/useDashboard';

const CONTENT_TOP = 10;

export default function HomeScreen() {
  const navHeight = useBottomNavHeight();
  const { dashboard, refresh } = useDashboard();
  const { user } = dashboard;

  return (
    <View style={styles.screen}>
      <HomeHeader name={user.name} avatar={user.avatar} verified={user.verified} />

      <PullToRefreshScrollView
        onRefresh={refresh}
        contentInsetTop={CONTENT_TOP}
        // The bottom nav floats over the content, so the last card needs room to scroll clear of it.
        contentContainerStyle={[styles.content, { paddingBottom: navHeight + 16 }]}
      >
        <View style={styles.accountGroup}>
          <BalanceCard balance={dashboard.balance} />
          <ServiceShortcuts />
        </View>

        <View style={styles.feedGroup}>
          <PromoCarousel promos={dashboard.promos} />
          <RecentTransactions />
        </View>
      </PullToRefreshScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: 15,
    paddingTop: CONTENT_TOP,
    paddingHorizontal: 8,
  },
  accountGroup: {
    gap: 10,
  },
  feedGroup: {
    gap: 7,
  },
});
