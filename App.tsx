import { NativeBaseProvider } from 'native-base'

import { Loading } from '~/components/Loading'
import useLoadFonts from '~/hooks/useLoadFonts'
import { Routes } from '~/routes'
import { THEME } from '~/styles/theme'

export default function App() {
  const [fontsLoaded] = useLoadFonts()

  return (
    <NativeBaseProvider theme={THEME}>
      {!fontsLoaded ? <Loading /> : <Routes />}
    </NativeBaseProvider>
  )
}
