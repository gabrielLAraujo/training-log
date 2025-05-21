

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
