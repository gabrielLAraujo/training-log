export interface Exercise {
  token: string;
  name: string;
}

export interface Workout {
  token: string;
  name: string;
  exercises: Exercise[];
}

export interface Session {
  token: string;
  workoutToken: string;
  date: string;
  exercises: {
    exerciseToken: string;
    sets: {
      weight: number;
      reps: number;
    }[];
  }[];
}