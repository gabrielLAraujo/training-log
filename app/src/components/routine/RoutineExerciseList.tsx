import ExerciseCardInline from "../exercise/ExerciseCardInline";
import { Exercise } from "@/types/exercise";

interface RoutineExerciseListProps {
  exercises: Exercise[];
  onRemove: (ex: Exercise) => void;
}

export default function RoutineExerciseList({ exercises, onRemove }: RoutineExerciseListProps) {
  if (!exercises.length) return null;
  return (
    <div>
      {exercises.map((ex, idx) => (
        <ExerciseCardInline key={ex.id + idx} ex={ex} onRemove={onRemove} />
      ))}
    </div>
  );
}
