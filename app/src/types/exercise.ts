export interface ExerciseFull {
  id: number
  name: string
  description: string
  category: number
  muscles: number[]
  equipment: number[]
  images: string[]
}

// src/types/freeExercise.ts

export interface Exercise {
  id: string
  name: string
  force: string
  level: string
  mechanic: string | null
  equipment: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  category: string
  images: string[]
}
