export interface Exercise {
  id: string;
  name: string;
  force?: string | null;
  level: string;
  mechanic?: string | null;
  equipment?: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  images?: string[];
  category: string;
  minRepetitions?: number | null;
  maxRepetitions?: number | null;
  numberOfSets?: number | null;
}