// src/hooks/useFreeExercises.ts
import useSWR from 'swr'
import { Exercise } from '../types/exercise'
import axios from 'axios'

const URL =
  'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'

// fetcher usando axios
const fetcher = async (url: string): Promise<Exercise[]> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar exercícios: ${error}`);
  }
}

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
