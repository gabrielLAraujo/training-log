import { Dumbbell, Plane, Play, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useRouter } from "next/router";

export default function RoutineCard({ routine, onClick,onDelete }: { routine: any; onClick: (routine: any) => void;onDelete: (routine: any) => void }) {
  const router = useRouter();
  return (
    <Card key={routine.id}>
    <CardHeader className="flex items-center flex-row  p-4">
        <Dumbbell className="h-5 w-5 text-blue-600 " />
        <CardTitle className="h-5 w-20">{routine.name}</CardTitle>
        <Button variant="ghost" className="bg-white hover:bg-red-50 border border-red-200">
            <Trash className="h-5 w-5 text-red-600" onClick={() => onDelete(routine)} />
        </Button>
        <Button variant="ghost" className="ml-auto rounded-full p-2 bg-white hover:bg-blue-50 border border-blue-200" onClick={onClick}>
            <Play className="h-4 w-4 text-blue-600" onClick={() => router.push(`/routine/${routine.id}`)}/>
        </Button>
    </CardHeader>
    </Card>
  );
  
}