import { Heading, SectionList, Text, VStack } from 'native-base'
import { useEffect, useState } from 'react'

import { ScreenHeader } from '~/components/header/screen-header'
import { HistoryCard } from '~/components/history-card'

type ExerciseDTO = {
  title: string
  data: string[]
}

export function History() {
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  useEffect(() => {
    setExercises([
      {
        title: '26.08.22',
        data: ['Puxada frontal', 'Remada unilateral'],
      },
      {
        title: '27.08.22',
        data: ['Puxada frontal'],
      },
    ])
  }, [])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
      />
    </VStack>
  )
}
