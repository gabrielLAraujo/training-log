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


 

  return (
    <main className="container mx-auto py-8 px-4 md:px-6 space-y-8">
      <Card> 
        <CardHeader>
          <CardTitle>
            Crie uma rotina de treino
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Escolha os exercícios que deseja incluir na sua rotina de treino.
          </CardDescription>
          <div className="flex items-center justify-between mb-4">
                <Input placeholder="Repeticoes" className=""></Input>
              <Input placeholder="Series"></Input>
              <Input placeholder="Intervalo entre Series"></Input>
              </div>
        <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="h-6 w-6 mr-2" />
            Exercícios
          </CardTitle>
          <CardDescription>
            Encontre exercícios para treinar em casa ou na academia.
          </CardDescription>
          </CardHeader>
          <CardContent>
             
         
                  <ExerciseListDialog open={true}></ExerciseListDialog>
                      </CardContent>

     </Card>
     </CardContent>
     <CardFooter>
        <Button className="w-full">
              Criar Rotina
            </Button>
          <Button variant="secondary" className="w-full">
              Cancelar
            </Button>
     </CardFooter>
     </Card>
    </main>
  )
}
