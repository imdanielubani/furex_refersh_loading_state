import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      {/* Headers are transparent on iOS 26+, so the root scroll view must inset itself. */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <Text>Expo Router is set up.</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
