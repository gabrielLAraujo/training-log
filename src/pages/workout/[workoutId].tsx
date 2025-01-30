// src/pages/workouts/[workoutId].tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Workout, Session } from '../../types';
import toast from 'react-hot-toast';

export default function WorkoutDetail() {
  const router = useRouter();
  const { workoutId } = router.query;
  const [sessions, setSessions] = useState<Session[]>([]);

  const addSession = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      workoutId: workoutId as string,
      date: new Date().toLocaleDateString(),
      exercises: [],
    };
    setSessions([...sessions, newSession]);
    toast.success('Sessão criada!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sessões de Treino</h1>
      <button
        onClick={addSession}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Nova Sessão
      </button>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Sessão em {session.date}</h2>
            {/* Adicionar exercícios e séries aqui */}
          </div>
        ))}
      </div>
    </div>
  );
}
