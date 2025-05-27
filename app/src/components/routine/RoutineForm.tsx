import RoutineHeader from "./RoutineHeader";
import RoutineExerciseList from "./RoutineExerciseList";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchAutocomplete } from "@/components/exercise/SearchAutocomplete";
import { Exercise } from "@/types/exercise";
import { useState } from "react";
import { Routine } from "@/types/Routine";
import { v4 as uuidv4 } from "uuid";

interface RoutineFormProps {
  exercises: Exercise[];
  onAddExercise: (ex: Exercise) => void;
  onRemoveExercise: (ex: Exercise) => void;
  addedExercises: Exercise[];
  minRepetition: number;
  maxRepetition: number;
  numberOfSets?: number; // Adicione esta propriedade se necessário
  setMinRepetition: (n: number) => void;
  setMaxRepetition: (n: number) => void;
  routineName: string;
  setRoutineName: (s: string) => void;
  setNumberOfSets: (n: number) => void;
  setRoutines: React.Dispatch<React.SetStateAction<Routine[]>>; // Receba setRoutines como prop para atualizar a lista de rotinas
  setAddedExercises: (exs: Exercise[]) => void; // Receba setAddedExercises como prop para resetar a lista após criar rotina
}

export default function RoutineForm({
  exercises,
  onAddExercise,
  onRemoveExercise,
  addedExercises,
  minRepetition,
  maxRepetition,
  numberOfSets,
  setMinRepetition,
  setMaxRepetition,
  routineName,
  setRoutineName,
  setNumberOfSets,
  setAddedExercises,
  setRoutines
}: RoutineFormProps) {
  const handleCreateRoutine = () => {
    if (!routineName.trim()) {
      alert("Dê um nome para a rotina!");
      return;
    }
    if (addedExercises.length === 0) {
      alert("Adicione pelo menos um exercício à rotina!");
      return;
    }
  const routine: Routine = {
    id: uuidv4(), 
    name: routineName,
    exercises: addedExercises.map((ex) => ({
      ...ex,
      minRepetitions: minRepetition,
      maxRepetitions: maxRepetition,
      numberOfSets: numberOfSets || 3
    }))
  };
  setRoutines((prev: Routine[]) => [...prev, routine]);
    alert("Rotina criada com sucesso!");
    resetForm();
  };
  const resetForm = () => {
    setRoutineName("");
    setMinRepetition(0);
    setMaxRepetition(15);
    setAddedExercises([]);
  };
  return (
    <Card className="shadow-lg border-0">
      <RoutineHeader />
      <CardContent className="space-y-6 p-6">
        <Input
          placeholder="Nome da Rotina"
          className="mb-2 text-lg font-medium bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400"
          value={routineName}
          onChange={e => setRoutineName(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Min Repetições"
            type="number"
            value={minRepetition}
            onChange={e => setMinRepetition(Number(e.target.value))}
            className="bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400"
          />
          <Input
            placeholder="Max Repetições"
            type="number"
            value={maxRepetition}
            onChange={e => setMaxRepetition(Number(e.target.value))}
            className="bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400"
          />
          <Input
            placeholder="Numero de Series"
            className="bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400"
            value={numberOfSets || 3}
            type="number"
            onChange={e => setNumberOfSets(Number(e.target.value))}/>
        </div>
        <Card className="mt-6 bg-gray-50 border-0 shadow-none">
          <CardContent className="p-4 pt-0">
            <SearchAutocomplete
              dataset={exercises?.map((ex) => ({ id: ex.id, name: ex.name })) || []}
              onSelect={(item) => {
                const found = exercises?.find((ex) => ex.id === item.id);
                if (found) onAddExercise(found);
              }}
            />
            <RoutineExerciseList exercises={addedExercises} onRemove={onRemoveExercise} />
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow" onClick={handleCreateRoutine}>
          Criar Rotina
        </Button>
        <Button variant="secondary" className="w-full md:w-auto" onClick={resetForm}>
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  );
}
