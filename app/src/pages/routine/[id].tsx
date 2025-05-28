import { Routine } from "@/types/Routine";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRoutines } from "@/hooks/useRoutines";

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
  return <div>RoutinePage {id}</div>;
}