// src/hooks/useExerciseExecutions.ts
import useSWR from 'swr'
import axios from 'axios'
import { ExerciseExecution } from '../types/exerciseExecution'

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url)
  return response.data
}

/**
 * Hook para buscar as execuções de exercícios de uma sessão.
 * @param sessionId ID da WorkoutSession
 */
export function useExerciseExecutions(sessionId?: string) {
  // só dispara a requisição quando tivermos sessionId
  const key = sessionId ? `/api/exercise-executions?sessionId=${sessionId}` : null

  const { data, error, mutate } = useSWR<ExerciseExecution[]>(key, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    executions: data,
    isLoading: !!sessionId && !error && !data,
    isError: Boolean(error),
    mutateExecutions: mutate,
  }
}
