export interface Exercise {
  id: string;
  name: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Session {
  id: string;
  workoutId: string;
  date: string;
  exercises: {
    exerciseId: string;
    sets: {
      weight: number;
      reps: number;
    }[];
  }[];
}