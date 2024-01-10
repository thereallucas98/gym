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
import { TouchableOpacity } from 'react-native'

import { Button } from '~/components/button'
import { ScreenHeader } from '~/components/header/screen-header'
import { UserPhoto } from '~/components/header/user-photo'
import { Input } from '~/components/input'

const PHOTO_SIZE = 33

export function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/thereallucas98.png',
  )
  const toast = useToast()

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

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
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
              source={{ uri: userPhoto }}
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

          <Input bg="gray.600" placeholder="Nome" />
          <Input bg="gray.600" placeholder="E-mail" isDisabled />
        </Center>

        <Center px={10} mt={12} mb={9}>
          <Heading color="gray.200" alignSelf="flex-start" fontSize="md" mb={2}>
            Alterar senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />
          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
