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
import { Input } from '~/components/input'

export function SignUp() {
  const navigation = useNavigation()
  const theme = useTheme()

  function handleGoBack() {
    navigation.goBack()
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
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt="auto"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
