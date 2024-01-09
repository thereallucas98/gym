/* eslint-disable camelcase */
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

const useLoadFonts = () => {
  return useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
}

export default useLoadFonts
