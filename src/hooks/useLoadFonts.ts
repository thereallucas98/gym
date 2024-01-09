/* eslint-disable camelcase */
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

const useLoadFonts = () => {
  return useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
}

export default useLoadFonts
