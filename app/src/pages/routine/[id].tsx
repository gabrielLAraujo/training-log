import { Routine } from "@/types/Routine";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRoutines } from "@/hooks/useRoutines";
import RoutineList from "@/components/routine/RoutineList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoutinePage() {
 const [routine, setRoutine] = useState<Routine | null>(null);
 const { getRoutine } = useRoutines();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchRoutine = async () => {
      const routine = await getRoutine(id as string);
      console.log(routine);
      setRoutine(routine);
    };
    fetchRoutine();
  }, [id]);

  const setRoutines = (routines: Routine[]) => {
    setRoutine(routines[0]);
  };

  return (
    <main className="container mx-auto py-10 px-4 md:px-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{routine?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{routine?.exercises.map((exercise) => exercise.name).join(", ")}</p>
        </CardContent>  
      </Card>
    </main>
  );
}