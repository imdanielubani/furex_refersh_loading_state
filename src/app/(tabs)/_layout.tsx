import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { StyleSheet } from 'react-native';

import { BottomNav } from '@/components/navigation/BottomNav';

export default function TabsLayout() {
  return (
    <Tabs style={styles.root}>
      <TabSlot />
      {/* Registers the routes; BottomNav renders the visible triggers by name. */}
      <TabList style={styles.hidden}>
        <TabTrigger name="index" href="/" />
        <TabTrigger name="wallet" href="/wallet" />
        <TabTrigger name="giftcards" href="/giftcards" />
        <TabTrigger name="cards" href="/cards" />
        <TabTrigger name="profile" href="/profile" />
      </TabList>
      <BottomNav />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});
