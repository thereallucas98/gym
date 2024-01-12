/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from 'native-base'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { UserDTO } from '~/dtos/user-dto'
import { api } from '~/lib/axios'
import {
  storageDeleteAuthToken,
  storageGetAuthToken,
  storageSaveAuthToken,
} from '~/storage/storage-auth-token'
import {
  storageRemoveUser,
  storageUserGet,
  storageUserSave,
} from '~/storage/storage-user'
import { AppError } from '~/utils/app-error'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => void
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)
  const [user, setUser] = useState({
    id: '1',
    name: 'David Lucas',
    email: 'lucas1998david@gmail.com',
    avatar: 'lucas.png',
  })

  const toast = useToast()

  async function updateUserAndToken(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)
  }

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      await storageUserSave(userData)
      await storageSaveAuthToken(token)
    } catch (error) {
      console.log('error', error)
      toast.show({
        title: 'Algo deu errado.',
        description:
          'Na tentativa de login ocorreu um erro. Tente novamente mais tarde',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndToken(data.user, data.token)
        updateUserAndToken(data.user, data.token)
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

      toast.show({
        title: 'Algo deu errado.',
        description: errorMessage,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageRemoveUser()
      await storageDeleteAuthToken()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet()
      const token = await storageGetAuthToken()

      if (token && userLogged) {
        updateUserAndToken(userLogged, token)
      }
    } catch (error) {
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
