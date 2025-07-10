import { useState } from 'react';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { LoginIcon, TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/context/AuthContext';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { globals } from '@/styles/_global';

export default function Login() {
  const { authenticate, isLoadingAuth } = useAuth();

  const [authMode, setAuthMode] = useState<"login" | "register">('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onAuthenticate() {
    await authenticate(authMode, email, password);
  }

  function onToggleAuthMode() {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={ globals.container }>
      <ScrollView contentContainerStyle={ globals.container }>
        <VStack flex={ 1 } justifyContent='center' alignItems='center' p={ 48 } gap={ 40 }>

          <HStack gap={ 10 }>
            <Text color='#C8313E' fontSize={ 35 } bold mb={ 20 }>ПРАЦА</Text>
            <LoginIcon name="ticket" size={ 45 } />
          </HStack >

          <VStack w={ "100%" } gap={ 30 }>

            <VStack gap={ 5 }>
              {/* <Text  ml={ 10 } fontSize={ 14 } color="#2E2E2E">Email</Text> */}
              <Input
                value={ email }
                onChangeText={ setEmail }
                placeholder="Email"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={ false }
                h={ 48 }
                p={ 14 }
              />
            </VStack>

            <VStack gap={ 5 }>
              {/* <Text ml={ 10 } fontSize={ 14 } color="#2E2E2E">Password</Text> */}
              <Input
                value={ password }
                onChangeText={ setPassword }
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={ false }
                h={ 48 }
                p={ 14 }
              />
            </VStack>

            <Button isLoading={ isLoadingAuth } onPress={ onAuthenticate }>{ authMode === 'login' ? 'Войти' : 'Зарегистрироваться' }</Button>

          </VStack>

          <Divider w={ "90%" } />

          <Text onPress={ onToggleAuthMode } fontSize={ 16 } underline>
            { authMode === 'login' ? 'Новый аккаунт' : 'Есть аккаунт' }
          </Text>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}
