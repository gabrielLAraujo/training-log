// src/hooks/useFreeExercises.ts
import useSWR from 'swr'
import { Exercise } from '../types/exercise'

const URL =
  'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'

// fetcher genérico
const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(`Erro ${res.status} ao buscar exercícios`)
    return res.json() as Promise<Exercise[]>
  })

export function useFreeExercises() {
  const { data, error } = useSWR<Exercise[]>(URL, fetcher, {
    revalidateOnFocus: false
  })

  return {
    exercises: data,
    isLoading: !error && !data,
    isError: error
  }
}
