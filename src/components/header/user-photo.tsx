import { IImageProps, Image } from 'native-base'

type UserPhotoProps = IImageProps & {
  size: number
}

export function UserPhoto({ size, alt, ...rest }: UserPhotoProps) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      alt={alt}
      borderColor="gray.400"
      {...rest}
    />
  )
}
