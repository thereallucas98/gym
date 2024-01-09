import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { useEffect, useState } from 'react'

import { ExerciseCard } from '~/components/exercise-card'
import { Group } from '~/components/group'
import { HomeHeader } from '~/components/header/home-header'

export function Home() {
  const [groups, setGroups] = useState<string[]>()
  const [exercises, setExercises] = useState<string[]>()
  const [groupSelected, setGroupSelected] = useState('Costas')

  useEffect(() => {
    setGroups(['Costas', 'Bíceps', 'Tríceps', 'ombro'])
    setExercises([
      'Puxada frontal',
      'Remada curvada',
      'Remada unilateral',
      'Levantamento terras',
    ])
  }, [])

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
        maxH={10}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
      />

      <VStack px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises?.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  )
}
