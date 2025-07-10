import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/context/AuthContext';
import { eventService } from '@/services/events';
import { Event } from '@/types/event';
import { UserRole } from '@/types/user';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';

export default function EventsScreen() {

  const formatDate = (dateString: string): string =>{
    const date = new Date(dateString);
    return new Date(date).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };



  const { user } = useAuth();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  function onGoToEventPage(id: number) {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`);
    }
  }


  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchEvents(); }, []));

  useEffect(() => {
    navigation.setOptions({
      headerRight: user?.role === UserRole.Manager ? headerRight : null,
    });
  }, [navigation, user]);

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>

      <HStack alignItems='center' justifyContent='space-between'>
        <Text fontSize={18} bold>{events.length} Заданий</Text>
      </HStack>

      <FlatList

        keyExtractor={(item) => item.id.toString()}
        data={events}
        onRefresh={fetchEvents}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <VStack h={50} />}
        renderItem={({ item: event }) => (
          <TouchableOpacity onPress={() => onGoToEventPage(event.id)}>
            <VStack
              gap={10}
              p={20}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
              }} key={event.id}>


              <HStack alignItems='center' justifyContent="space-between">
                <VStack gap={6}>
                  <Text fontSize={20} bold >{event.name}</Text>
                  <HStack>
                    <Text fontSize={17}>Адрес: </Text>
                    <Text fontSize={17}  >{event.location}</Text>
                  </HStack>

                </VStack>
                {user?.role === UserRole.Manager && <TabBarIcon size={24} name="chevron-forward" />}
              </HStack>


              <Divider />

              <HStack justifyContent='space-between'>
                <Text bold fontSize={16} color='green'>Награда: {event.price}</Text>
                <Text bold fontSize={16} color='red'>Время: {event.duration}</Text>
              </HStack>
              <Text fontSize={16} color='gray'>{formatDate(event.date)}</Text> 
            </VStack>
          </TouchableOpacity>

        )}
      />

    </VStack>
  );
}

const headerRight = () => {
  return (
    <TabBarIcon size={32} name="add-circle-outline" onPress={() => router.push('/(events)/new')} />
  );
};
