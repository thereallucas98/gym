import { NativeBaseProvider } from 'native-base'

import { Loading } from '~/components/Loading'
import useLoadFonts from '~/hooks/useLoadFonts'
import { THEME } from '~/styles/theme'
import { SignIn } from '~/screens/SignIn'

export default function App() {
  const [fontsLoaded] = useLoadFonts()

  return (
    <NativeBaseProvider theme={THEME}>
      {!fontsLoaded ? <Loading /> : <SignIn />}
    </NativeBaseProvider>
  )
}
