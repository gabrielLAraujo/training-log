// src/pages/index.tsx
import { useState } from 'react';
import { Workout } from '../types';
import toast from 'react-hot-toast';
import WorkoutCard from '@/components/workoutCard';

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: `Treino ${workouts.length + 1}`,
      exercises: [],
    };
    setWorkouts([...workouts, newWorkout]);
    toast.success('Treino criado!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meus Treinos</h1>
      <button
        onClick={addWorkout}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Criar Treino
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}