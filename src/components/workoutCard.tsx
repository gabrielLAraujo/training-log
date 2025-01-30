// src/components/WorkoutCard.tsx
import Link from 'next/link';
import { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold">{workout.name}</h2>
        <p className="text-gray-600">{workout.exercises.length} exercícios</p>
      </div>
    </Link>
  );
}