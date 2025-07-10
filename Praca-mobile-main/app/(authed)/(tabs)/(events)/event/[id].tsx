import { Button } from '@/components/Button';
import DateTimePicker from '@/components/DateTimePicker';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { eventService } from '@/services/events';
import { Event } from '@/types/event';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

export default function EventDetailsScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);

  function updateField(field: keyof Event, value: string | Date) {
    setEventData((prev) => ({
      ...prev!,
      [field]: value,
    }));
  }

  const onDelete = useCallback(async () => {
    if (!eventData) return;
    try {
      Alert.alert("Удалить задание", "Вы точно хотите удалить задание?", [
        { text: "Cancel" },
        {
          text: "Удалить", onPress: async () => {
            await eventService.deleteOne(Number(id));
            router.back();
          }
        },
      ]);
    } catch (error) {
      Alert.alert("Error", (error as Error).message || "Failed to delete event");
    }
  }, [eventData, id]);

  async function onSubmitChanges() {
    if (!eventData) return;
    try {
      setIsSubmitting(true);
      await eventService.updateOne(Number(id),
        eventData.name,
        eventData.location,
        eventData.price,
        eventData.duration,
        eventData.coment,
        eventData.date,
      );
      router.back();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update event";
    Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchEvent = async () => {
    try {
      const response = await eventService.getOne(Number(id));
      setEventData(response.data);
    } catch (error) {
      router.back();
    }
  };

  useFocusEffect(useCallback(() => { fetchEvent(); }, []));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => headerRight(onDelete)
    });
  }, [navigation, onDelete]);

  return (
    <ScrollView>
    <VStack m={20} flex={1} gap={30}>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Название</Text>
        <Input
          value={eventData?.name}
          onChangeText={(value) => updateField("name", value)}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Место</Text>
        <Input
          value={eventData?.location}
          onChangeText={(value) => updateField("location", value)}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>
      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Вознаграждение</Text>
        <Input
          value={eventData?.price}
          onChangeText={(value) => updateField("price", value)}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>
      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Продолжительность</Text>
        <Input
          value={eventData?.duration}
          onChangeText={(value) => updateField("duration", value)}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>
      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Дополнение</Text>
        <Input
          value={eventData?.coment}
          onChangeText={(value) => updateField("coment", value)}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Дата</Text>
        <DateTimePicker
          onChange={(date) => updateField('date', date || new Date())}
          currentDate={new Date(eventData?.date || new Date())}
        />
      </VStack>

      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={onSubmitChanges}
      >
        Сохранить изменения
      </Button>

    </VStack>
    </ScrollView>
  );
}

const headerRight = (onPress: VoidFunction) => {
  return (
    <TabBarIcon size={30} name="trash" onPress={onPress} />
  );
};
