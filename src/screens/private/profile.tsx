import { Center, Heading, ScrollView, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { Button } from '~/components/button'
import { ScreenHeader } from '~/components/header/screen-header'
import { UserPhoto } from '~/components/header/user-photo'
import { Input } from '~/components/input'

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          <UserPhoto
            source={{ uri: 'https://github.com/thereallucas98.png' }}
            alt="David Lucas"
            size={33}
          />
          <TouchableOpacity>
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
