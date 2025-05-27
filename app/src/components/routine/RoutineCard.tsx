import { Dumbbell, Plane, Play, Trash } from "lucide-react";

export default function RoutineCard({ routine, onClick,onDelete }: { routine: any; onClick: (routine: any) => void;onDelete: (routine: any) => void }) {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(routine)}
    >
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800">{routine.name}</h2>
            <Dumbbell></Dumbbell>
            <Trash className="text-red-600 h-6 w-6 cursor-pointer" onClick={(routine)=>onDelete(routine)} />
            <Play className="text-blue-600 h-6 w-6" />
        </div>
      <p className="text-gray-600 mt-2">
        {routine.exercises.length} exercício{routine.exercises.length !== 1 ? "s" : ""}
      </p>
      <div className="mt-4">
        {routine.exercises.slice(0, 3).map((ex: any, idx: number) => (
          <span key={ex.id + idx} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
            {ex.name}
          </span>
        ))}
        {routine.exercises.length > 3 && (
          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            +{routine.exercises.length - 3} mais
          </span>
        )}
      </div>
    </div>
  );
}