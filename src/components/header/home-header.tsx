import { Power } from 'lucide-react-native'
import { Heading, HStack, Text, useTheme, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import DefaultUserPhotoIMG from '~/assets/userPhotoDefault.png'
import { useAuth } from '~/hooks/use-auth'

import { UserPhoto } from './user-photo'

export function HomeHeader() {
  const { user, signOut } = useAuth()
  const { colors } = useTheme()

  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <UserPhoto
        alt={user?.name}
        source={user?.avatar ? { uri: user?.avatar } : DefaultUserPhotoIMG}
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user?.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Power size={24} color={colors.gray[200]} />
      </TouchableOpacity>
    </HStack>
  )
}
