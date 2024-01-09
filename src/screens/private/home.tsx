import { VStack } from 'native-base'

import { HomeHeader } from '~/components/header/home-header'

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
    </VStack>
  )
}
