import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types/exercise";

interface ExerciseCardInlineProps {
  ex: Exercise;
  onRemove: (ex: Exercise) => void;
}

export default function ExerciseCardInline({ ex, onRemove }: ExerciseCardInlineProps) {
  return (
    <Card className="flex items-center justify-between gap-4 p-3 mb-2 border border-gray-200 rounded-lg shadow-sm bg-white">
      <span className="font-medium text-blue-900 truncate flex-1 min-w-0">{ex.name}</span>
      {ex.category && (
        <span className="text-xs text-gray-500 truncate max-w-[100px]">{ex.category}</span>
      )}
      <span className="text-sm text-gray-600 whitespace-nowrap">{ex.minRepetitions} - {ex.maxRepetitions} rep</span>
      <Button
        variant="ghost"
        className="text-red-500 hover:text-red-600 px-2 py-1"
        size="icon"
        aria-label="Remover exercício"
        onClick={() => onRemove(ex)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </Card>
  );
}
