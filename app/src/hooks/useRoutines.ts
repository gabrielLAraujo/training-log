import { useState, useEffect } from "react";
import { Routine } from "@/types/Routine";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/routines`)
      .then((res) => res.json())
      .then((data) => setRoutines(data))
      .finally(() => setLoading(false));
  }, []);

  const addRoutine = async (routineData: Omit<Routine, "id">) => {
    const res = await fetch(`${API_URL}/routines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routineData),
    });
    const newRoutine = await res.json();
    setRoutines((prev) => [...prev, newRoutine]);
    return newRoutine;
  };

  const deleteRoutine = async (id: string) => {
    await fetch(`${API_URL}/routines/${id}`, { method: "DELETE" });
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoutine = async (id: string, data: Partial<Routine>) => {
    const res = await fetch(`${API_URL}/routines/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setRoutines((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  };

  return {
    routines,
    loading,
    addRoutine,
    deleteRoutine,
    updateRoutine,
    setRoutines,
  };
}