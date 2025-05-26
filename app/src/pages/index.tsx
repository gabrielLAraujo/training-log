"use client";

import React, { useState } from "react";

import { useFreeExercises } from "@/hooks/useFreeExercises";
import RoutineForm from "@/components/routine/RoutineForm";
import { Exercise } from "@/types/exercise";

export default function ExercisesPage() {
  const [minRepetition, setMinRepetiotion] = useState(6);
  const [numberOfSets, setNumberOfSets] = useState(3);
  const [maxRepetition, setMaxRepetiotion] = useState(15);
  const [addedExercises, setAddedExercises] = useState<Exercise[]>([]);
  const [routineName, setRoutineName] = useState("");
  const { exercises, isLoading } = useFreeExercises();

  const onAddExercise = (exercise: Exercise) => {
    const exerciseWithReps = {
      ...exercise,
      maxRepetitions: maxRepetition,
      minRepetitions: minRepetition,
    };
    setAddedExercises((prev) => [...prev, exerciseWithReps]);
  };

  const onRemoveExercise = (exercise: Exercise) => {
    setAddedExercises((prev) => prev.filter((ex) => ex.id !== exercise.id));
  };

  return (
    <main className="container mx-auto py-10 px-4 md:px-8 max-w-3xl">
      <div className="flex flex-line gap-6">
        <RoutineForm
          exercises={exercises || []}
          onAddExercise={onAddExercise}
          onRemoveExercise={onRemoveExercise}
          addedExercises={addedExercises}
          minRepetition={minRepetition}
          maxRepetition={maxRepetition}
          setMinRepetition={setMinRepetiotion}
          setMaxRepetition={setMaxRepetiotion}
          routineName={routineName}
          setRoutineName={setRoutineName}
          setNumberOfSets={setNumberOfSets}
        />
      </div>
    </main>
  );
}
