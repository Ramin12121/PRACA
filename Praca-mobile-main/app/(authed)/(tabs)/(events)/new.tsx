import { Button } from '@/components/Button';
import DateTimePicker from '@/components/DateTimePicker';
import { HStack } from '@/components/HStack';
import { Input} from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { eventService } from '@/services/events';
import { useNavigation, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';



export default function NewEvent() {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [coment, setComent] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

  async function onSubmit() {
    try {
      setIsSubmitting(true);

      await eventService.createOne(name, location, price, duration, coment, date.toISOString());
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onChangeDate(date?: Date) {
    setDate(date || new Date());
  }

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Создать задание" });
  }, []);

  return (
    <ScrollView>
    <VStack m={20} flex={1} gap={30}>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Название</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Место</Text>
        <Input
          value={location}
          onChangeText={setLocation}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Вознаграждение</Text>
        <Input
          value={price}
          onChangeText={setPrice}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>


      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Продолжительность</Text>
        <Input
          value={duration}
          onChangeText={setDuration}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48} 
          p={7}
        />
      </VStack>
      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Дополнение</Text>
        <Input
          value={coment}
          onChangeText={setComent}
          placeholder="Введите"
          placeholderTextColor="darkgray"
          h={48} 
          p={7}
        />
      </VStack>


      <VStack>
        <Text ml={10} fontSize={14} color="gray">Дата</Text>
        <DateTimePicker onChange={onChangeDate} currentDate={date} />
      </VStack>



      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={onSubmit}
      >
        Сохранить
      </Button>

    </VStack>
</ScrollView>
  );
};
