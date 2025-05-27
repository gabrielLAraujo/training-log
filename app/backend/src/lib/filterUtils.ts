import { Exercise } from "@/types/exercise";
import { FilterOptions } from "@/types/filter";

     
export function getFilterOptions(exercises: Exercise[]): FilterOptions {
  return {
    force: Array.from(new Set(exercises.map(e => e.force))),
    level: Array.from(new Set(exercises.map(e => e.level))),
    mechanic: Array.from(new Set(exercises.map(e => e.mechanic))).filter((m): m is string => m !== null),
    equipment: Array.from(new Set(exercises.map(e => e.equipment))),
    category: Array.from(new Set(exercises.map(e => e.category))),
    primaryMuscles: Array.from(new Set(exercises.flatMap(e => e.primaryMuscles))),
    secondaryMuscles: Array.from(new Set(exercises.flatMap(e => e.secondaryMuscles))),
  };
}