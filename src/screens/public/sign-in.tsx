import { useNavigation } from '@react-navigation/native'
import { Dumbbell } from 'lucide-react-native'
import {
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base'

import BackgroundImg from '~/assets/background.png'
import { Button } from '~/components/button'
import { Input } from '~/components/form/input'
import { AuthNavigatorRoutesProps } from '~/routes/auth.routes'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const theme = useTheme()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <HStack alignItems="center" justifyContent="center" space={4}>
            <Dumbbell size={32} color={theme.colors.green[700]} />
            <Heading color="gray.100" fontSize="3xl" fontWeight={700}>
              Gym
            </Heading>
          </HStack>

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse a conta
          </Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" />
        </Center>

        <Center mt="auto">
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button
          title="Criar Conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  )
}
