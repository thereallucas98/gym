import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Dumbbell } from 'lucide-react-native'
import {
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  useTheme,
  useToast,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import BackgroundImg from '~/assets/background.png'
import { Button } from '~/components/button'
import { Input } from '~/components/form/input'
import { api } from '~/lib/axios'

const signUpSchema = z
  .object({
    name: z.string().min(5, { message: 'O campo é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(5, { message: 'A senha deve ter 6 caracteres' }),
    password_confirm: z
      .string()
      .min(5, { message: 'A senha deve ter 6 caracteres' }),
  })
  .refine((v) => v.password === v.password_confirm, {
    path: ['password_confirm'],
    message: 'Senhas não são iguais',
  })

type SignUpInputs = z.infer<typeof signUpSchema>

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  })
  const navigation = useNavigation()
  const toast = useToast()
  const theme = useTheme()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp(data: SignUpInputs) {
    const { name, email, password } = data

    try {
      setIsLoading(true)
      await api.post('/users', { name, email, password })

      toast.show({
        title: 'Seu cadastro foi realizado com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigation.goBack()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.show({
          title: 'Algo deu errado. Fale com o suporte.',
          description: error.response?.data.message,
          placement: 'top',
          bgColor: 'red.500',
        })
      }
    } finally {
      reset()
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                error={errors?.name}
              />
            )}
          />

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
                onChangeText={onChange}
                value={value}
                error={errors?.password}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                error={errors?.password_confirm}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          isLoading={isLoading}
          title="Voltar para o login"
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
