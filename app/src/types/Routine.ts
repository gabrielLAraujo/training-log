import { Exercise } from "./exercise";

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
}