import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RoutineHeader() {
  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-blue-900">
        Crie uma rotina de treino
      </CardTitle>
      <CardDescription className="text-gray-600">
        Escolha os exercícios que deseja incluir na sua rotina de treino.
      </CardDescription>
    </CardHeader>
  );
}
