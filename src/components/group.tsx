import { IPressableProps, Pressable, Text } from 'native-base'

type GroupProps = IPressableProps & {
  name: string
  isActive: boolean
}

export function Group({ name, isActive = false, ...rest }: GroupProps) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      isPressed={isActive}
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1,
      }}
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight={700}
      >
        {name}
      </Text>
    </Pressable>
  )
}
