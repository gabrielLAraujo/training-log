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

export default function ExercisesPage() {
  const { exercises, isLoading } = useFreeExercises();
  const [selectedExercise, setSelectedExercise] = useState<string | undefined>(undefined);

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
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-gray-700 mb-1">Selecione um exercício</label>
                <Select
                  value={selectedExercise}
                  onValueChange={setSelectedExercise}
                  disabled={isLoading || !exercises}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder={isLoading ? "Carregando..." : "Escolha um exercício"} />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises && exercises.length > 0 ? (
                      exercises.map((ex) => (
                        <SelectItem key={ex.id} value={ex.id.toString()}>{ex.name}</SelectItem>
                      ))
                    ) : null}
                  </SelectContent>
                </Select>
              </div>
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
