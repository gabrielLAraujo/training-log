import { Routine } from "@/types/Routine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dumbbell, Play, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Title } from "@radix-ui/react-dialog";

export default function RoutineList({ routines,setRoutines }: { routines: Routine[], setRoutines: (routines: Routine[]) => void }) {
  const onDelete = (routine: Routine) => {
    console.log("Deleting routine:", routine);
    console.log("Current routines before deletion:", routines);
    const updatedRoutines = routines.filter((r) => r.id !== routine.id);
    setRoutines(updatedRoutines);
  };

  return (
    <Card className="shadow-lg border-0">
        <CardHeader>
            <h1 className="text-2xl font-bold text-blue-900 mb-4">Minhas Rotinas</h1>
        <CardDescription>
      <p className="text-gray-600 mb-6">
        Aqui você pode visualizar e gerenciar suas rotinas de treino.
      </p>
        </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
        
        {routines?.map((routine, index) => (
            
            <Card key={routine.id}>
                <CardHeader className="flex items-center flex-row  p-4">
                    <Dumbbell className="h-5 w-5 text-blue-600 " />
                    <CardTitle className="h-5 w-20">{routine.name}</CardTitle>
                    <Button>
                        <Trash className="h-5 w-5 text-red-600" onClick={() => onDelete(routine)} />
                    </Button>
                    <Button className="ml-auto rounded-full p-2" onClick={() => console.log("Iniciar rotina", routine)}>
                        <Play />
                    </Button>
                </CardHeader>
                </Card>
        ))}
        </CardContent>
    </Card>
  );
}