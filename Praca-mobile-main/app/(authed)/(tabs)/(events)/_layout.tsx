import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { router, Stack } from 'expo-router';

export default function EventsLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Events" }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'ПРАЦА', // Убираем название
          headerRight
        }}
      />
      <Stack.Screen name="new" />
      <Stack.Screen name="event/[id]" />
    </Stack>
  );
}

const headerRight = () => {
  return (
    <TabBarIcon size={32} name="add-circle-outline" onPress={() => router.push('/(events)/new')} />
  );
};