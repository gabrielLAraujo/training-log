"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Car, Search, SlidersHorizontal } from "lucide-react"

import { useFreeExercises } from "@/hooks/useFreeExercises"
import { ExerciseList } from "@/components/exercise/ExerciseList"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExerciseSkeleton } from "@/components/exercise/ExerciseSkeleton"
import { EmptyState } from "../components/EmptyState"
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import ExerciseListDialog from "@/components/exercise/ExerciseListDialog"
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
export default function ExercisesPage() {
  const { exercises, isLoading } = useFreeExercises();
  const [selectedExercise, setSelectedExercise] = useState<string | undefined>(undefined);
const [searchTerm, setSearchTerm] = useState("")
  // 2. Debounce pra suavizar
  const debouncedSearch = useDebounce(searchTerm, 300)

  // 3. Filtragem memoizada
  const filteredExercises = useMemo(() => {
    if (!debouncedSearch) return exercises
    return exercises?.filter(ex =>
      ex.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [exercises, debouncedSearch])
  return (
    <main className="container mx-auto py-10 px-4 md:px-8 max-w-3xl">
      <div className="flex flex-line gap-6">

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Rotinas</CardTitle>
          <CardDescription className="text-gray-600">
            Suas rotinas salvas.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg p-6">
          <CardTitle className="text-2xl font-bold text-blue-900">Crie uma rotina de treino</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <CardDescription className="text-base text-gray-600 mb-4">
            Escolha os exercícios que deseja incluir na sua rotina de treino.
          </CardDescription>
          <Input placeholder="Nome da Rotina" className="mb-2 text-lg font-medium bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Repetições" className="bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400" />
            <Input placeholder="Séries" className="bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400" />
            <Input placeholder="Intervalo entre Séries" className="bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400" />
          </div>
          <Card className="mt-6 bg-gray-50 border-0 shadow-none">
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-2 p-4 pb-2">
              <CardTitle className="flex items-center text-lg text-blue-800">
                Exercícios
              </CardTitle>
              <CardDescription className="text-gray-500 md:ml-4">
                Encontre exercícios para treinar.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
               <div className="flex items-center gap-2 mb-4">
        <Search size={20} className="text-gray-500" />
        <Input
          placeholder={isLoading ? "Carregando exercícios…" : "Buscar exercício..."}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
      </div>

      {/* 2) Dropdown filtrado */}
      <Select
        value={undefined}               // ou seu estado de seleção
        onValueChange={() => {}}        // seu handler
        disabled={isLoading}
      >
        <SelectTrigger className="w-full bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400">
          <span>Escolha um exercício</span>
        </SelectTrigger>
        <SelectContent>
          { filteredExercises && filteredExercises.length > 0 ? (
            filteredExercises?.map(ex => (
              <SelectItem key={ex.id} value={ex.id.toString()}>
                {ex.name}
              </SelectItem>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Nenhum exercício encontrado.
            </div>
          )}
        </SelectContent>
      </Select>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">Criar Rotina</Button>
          <Button variant="secondary" className="w-full md:w-auto">Cancelar</Button>
        </CardFooter>
      </Card>
      </div>
    </main>
  )
}
