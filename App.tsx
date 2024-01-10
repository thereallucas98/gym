import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

import { Loading } from '~/components/loading'
import useLoadFonts from '~/hooks/useLoadFonts'
import { Routes } from '~/routes'
import { THEME } from '~/styles/theme'

export default function App() {
  const [fontsLoaded] = useLoadFonts()

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" />
      {!fontsLoaded ? <Loading /> : <Routes />}
    </NativeBaseProvider>
  )
}
