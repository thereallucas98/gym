import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE } from './store-config'

export async function storageSaveAuthToken(token: string) {
  await AsyncStorage.setItem(AUTH_STORAGE, token)
}

export async function storageGetAuthToken() {
  const token = await AsyncStorage.getItem(AUTH_STORAGE)

  return token
}

export async function storageDeleteAuthToken() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}
