/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
import { useCallback, useEffect, useState } from 'react'

import { ExerciseCard } from '~/components/exercise-card'
import { Group } from '~/components/group'
import { HomeHeader } from '~/components/header/home-header'
import { Loading } from '~/components/loading'
import { ExerciseDTO } from '~/dtos/exercise-dto'
import { api } from '~/lib/axios'
import { AppNavigatorRoutesProps } from '~/routes/app.routes'
import { AppError } from '~/utils/app-error'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const [groups, setGroups] = useState<string[]>()
  const [exercises, setExercises] = useState<ExerciseDTO[]>()
  const [groupSelected, setGroupSelected] = useState('Costas')

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups')

      setGroups(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        my={10}
        minH={10}
        maxH={10}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises?.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </VStack>
      )}
    </VStack>
  )
}
