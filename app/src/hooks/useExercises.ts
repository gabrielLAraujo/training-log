// src/hooks/useExercises.ts
import useSWR from 'swr'
import axios from 'axios'
import { Exercise } from '../types/exercise'

// Cria uma instância axios apontando pro seu backend.
// Coloque em .env NEXT_PUBLIC_API_URL=http://localhost:3333 (ou o host real)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// fetcher genérico que já retorna o tipo correto
const fetcher = async <T>(url: string): Promise<T> => {
  const res = await api.get<T>(url)
  return res.data
}

/**
 * Hook para buscar o catálogo de exercícios do banco
 */
export function useExercises() {
  // relative path para `/exercises`
  const { data, error } = useSWR<Exercise[]>('/exercises', fetcher, {
    revalidateOnFocus: false,
  })

  return {
    exercises: data,
    isLoading: !error && !data,
    isError: Boolean(error),
  }
}
