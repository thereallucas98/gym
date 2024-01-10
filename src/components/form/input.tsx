import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'
import { FieldError } from 'react-hook-form'

type InputProps = IInputProps & {
  error?: FieldError
}

export function Input({ error, ...rest }: InputProps) {
  return (
    <FormControl isInvalid={!!error}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        mb={4}
        placeholderTextColor="gray.300"
        isInvalid={!!error}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bgColor: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...rest}
      />
      {error?.message && (
        <FormControl.Label mb={4} _text={{ color: 'gray.100' }}>
          {error?.message}
        </FormControl.Label>
      )}
    </FormControl>
  )
}
