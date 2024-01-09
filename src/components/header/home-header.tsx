import { Power } from 'lucide-react-native'
import { Heading, HStack, Text, useTheme, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { UserPhoto } from './user-photo'

export function HomeHeader() {
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
        alt="David Lucas"
        source={{ uri: 'https://github.com/thereallucas98.png' }}
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          David Lucas
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Power size={24} color={colors.gray[200]} />
      </TouchableOpacity>
    </HStack>
  )
}
