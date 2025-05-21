import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dumbbell, Heart, Info } from "lucide-react"
import { Exercise } from "@/types/exercise"

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md"
        >
          {exercise.images ? (
            <div className="aspect-video w-full overflow-hidden">
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

          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{exercise.name}</CardTitle>
              {/* <Badge variant="outline" className={getDifficultyColor(exercise.)}>
                {getDifficultyLabel(exercise.equipment)}
              </Badge> */}
            </div>
            <CardDescription className="flex items-center mt-1">
              {getTypeIcon(exercise.force)}
              {getTypeLabel(exercise.level

              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {exercise.category || "Nenhuma descrição disponível para este exercício."}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between pt-2">
            <Button variant="outline" size="sm">
              Detalhes
            </Button>
            <Button size="sm">Adicionar</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
