import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dumbbell, Heart, Info } from "lucide-react"
import { Exercise } from "@/types/exercise"
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"

// Assuming this is the structure of your exercise object
// Update it according to your actual data structure


interface ExerciseListProps {
  exercises: Exercise[]
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return "Iniciante"
    if (difficulty <= 4) return "Intermediário"
    return "Avançado"
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    if (difficulty <= 4) return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
  }

  const getTypeIcon = (type: string) => {
    if(!type)
        return
    switch (type.toLowerCase()) {
      case "strength":
        return <Dumbbell className="h-4 w-4 mr-1" />
      case "cardio":
        return <Heart className="h-4 w-4 mr-1" />
      case "flexibility":
        return <Info className="h-4 w-4 mr-1" />
      default:
        return <Dumbbell className="h-4 w-4 mr-1" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case "strength":
        return "Força"
      case "cardio":
        return "Cardio"
      case "flexibility":
        return "Flexibilidade"
      default:
        return type
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          className="overflow-hidden flex flex-col h-full transition-all duration-200 shadow border-0 hover:shadow-lg bg-white rounded-xl"
        >
          {exercise.images ? (
            <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
              <img
                src={`exercises/${exercise.images[0]}` || "/placeholder.svg"}
                alt={exercise.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <Dumbbell className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold text-blue-900 line-clamp-1">{exercise.name}</CardTitle>
            </div>
            <CardDescription className="flex items-center mt-1 text-blue-700">
              {getTypeIcon(exercise.force)}
              <span className="ml-1 font-medium">{getTypeLabel(exercise.level)}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow px-4 pb-2">
            <p className="text-sm text-gray-500 line-clamp-3">
              {exercise.category || "Nenhuma descrição disponível para este exercício."}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between gap-2 pt-2 px-4 pb-4 bg-gray-50 border-t rounded-b-xl">
            <Button variant="outline" size="sm" className="w-1/2 border-blue-200 text-blue-700 hover:bg-blue-50">Detalhes</Button>
            <Button size="sm" className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">Adicionar</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
