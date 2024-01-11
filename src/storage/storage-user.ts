import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserDTO } from '~/dtos/user-dto'

import { USER_STORAGE } from './store-config'

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: UserDTO = storage ? JSON.parse(storage) : {}

  return user
}

export async function storageRemoveUser() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
