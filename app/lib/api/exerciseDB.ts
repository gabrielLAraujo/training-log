import axios from "axios";

const EXERCISE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/exercises";
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY!;
console.log(EXERCISE_API_URL, RAPIDAPI_KEY);
export async function fetchExercises() {
    
  const res = await axios(`${EXERCISE_API_URL}/exercises`, {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
    params: {
      limit: 100,
      offset: 0,
     }
});

  if (!res) throw new Error("Erro ao buscar exercícios");

  return res.data;
}
