import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "../ui/skeleton"

interface ExerciseSkeletonProps {
  count?: number
}

export function ExerciseSkeleton({ count = 9 }: ExerciseSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video w-full bg-muted">
            <Skeleton className="h-full w-full" />
          </div>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
