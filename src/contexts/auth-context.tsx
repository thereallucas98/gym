import { useToast } from 'native-base'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { UserDTO } from '~/dtos/user-dto'
import { api } from '~/lib/axios'
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

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
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
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageRemoveUser()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
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
