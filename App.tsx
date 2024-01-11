import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

import { Loading } from '~/components/loading'
import { AuthContextProvider } from '~/contexts/auth-context'
import useLoadFonts from '~/hooks/use-load-fonts'
import { Routes } from '~/routes'
import { THEME } from '~/styles/theme'

export default function App() {
  const [fontsLoaded] = useLoadFonts()

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" />
      <AuthContextProvider>
        {!fontsLoaded ? <Loading /> : <Routes />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
