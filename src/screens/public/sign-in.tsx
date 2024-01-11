import { zodResolver } from '@hookform/resolvers/zod'
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
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import BackgroundImg from '~/assets/background.png'
import { Button } from '~/components/button'
import { Input } from '~/components/form/input'
import { useAuth } from '~/hooks/use-auth'
import { AuthNavigatorRoutesProps } from '~/routes/auth.routes'

const signInSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(5, { message: 'A senha deve ter 6 caracteres' }),
})

type SignInInputs = z.infer<typeof signInSchema>

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  })
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const theme = useTheme()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn(data: SignInInputs) {
    const { email, password } = data
    try {
      setIsLoading(true)

      signIn(email, password)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                error={errors?.email}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignIn)}
                value={value}
                error={errors?.password}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>

        <Center mt="auto">
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button
          isLoading={isLoading}
          title="Criar Conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  )
}
