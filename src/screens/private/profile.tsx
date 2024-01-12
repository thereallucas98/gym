/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { z } from 'zod'

import DefaultUserPhotoIMG from '~/assets/userPhotoDefault.png'
import { Button } from '~/components/button'
import { Input } from '~/components/form/input'
import { ScreenHeader } from '~/components/header/screen-header'
import { UserPhoto } from '~/components/header/user-photo'
import { useAuth } from '~/hooks/use-auth'
import { api } from '~/lib/axios'
import { AppError } from '~/utils/app-error'

const PHOTO_SIZE = 33

const profileSchema = z
  .object({
    name: z.string().min(5, { message: 'O campo é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    old_password: z
      .string()
      .min(5, { message: 'A senha deve ter 6 caracteres' })
      .nullish()
      .transform((value) => value || null),
    password: z
      .string()
      .min(5, { message: 'A senha deve ter 6 caracteres' })
      .nullish()
      .transform((value) => value || null),
    confirm_password: z
      .string()
      .min(5, { message: 'A senha deve ter 6 caracteres' })
      .nullish()
      .transform((value) => value || null),
  })
  .refine((v) => v.password === v.confirm_password, {
    path: ['confirm_password'],
    message: 'Senhas não são iguais',
  })

type ProfileInputs = z.infer<typeof profileSchema>

export function Profile() {
  const [isLoading, setIsLoading] = useState(false)

  const { user, updatedUserProfile } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInputs>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  })

  async function handleUserPhotoSelected() {
    try {
      setIsLoading(true)
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return toast.show({
          title: 'Você cancelou a seleção de imagem.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        )

        if (photoInfo.exists) {
          if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
            return toast.show({
              title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
              placement: 'top',
              bgColor: 'red.500',
            })
          }
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any

        const userPhotoUploadForm = new FormData()

        userPhotoUploadForm.append('avatar', photoFile)

        const avatarUpdtedResponse = await api.patch(
          '/users/avatar',
          userPhotoUploadForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        const userUpdated = user

        userUpdated.avatar = avatarUpdtedResponse.data.avatar

        updatedUserProfile(userUpdated)

        toast.show({
          title: 'Foto atualizada!',
          placement: 'top',
          bgColor: 'green.500',
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateProfile(data: ProfileInputs) {
    console.log('data', data)
    try {
      setIsLoading(true)
      const userData = user
      userData.name = data.name

      await api.put('/users', data)
      updatedUserProfile(userData)

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      console.log('error', error)
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      reset()
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {isLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : DefaultUserPhotoIMG
              }
              alt="David Lucas"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text
              color="green.500"
              fontWeight={700}
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

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
                isDisabled
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                error={errors?.email}
              />
            )}
          />
        </Center>

        <Center px={10} mt={12} mb={9}>
          <Heading
            color="gray.200"
            alignSelf="flex-start"
            fontSize="md"
            mb={2}
            fontFamily="heading"
          >
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                value={value || ''}
                error={errors?.old_password}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value || ''}
                error={errors?.password}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value || ''}
                error={errors?.confirm_password}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            isLoading={isLoading}
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
