import { useState, useEffect } from "react";
import { Routine } from "@/types/Routine";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

// Configurar axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/routines')
      .then((response) => setRoutines(response.data))
      .catch((error) => console.error('Erro ao buscar rotinas:', error))
      .finally(() => setLoading(false));
  }, []);

  const addRoutine = async (routineData: Omit<Routine, "id">) => {
    try {
      console.log('Enviando dados:', routineData); // Debug
      
      const backendData = {
        name: routineData.name,
        exercises: routineData.exercises.map(exercise => ({
          exerciseId: exercise.id,
          minRepetitions: exercise.minRepetitions || 8,
          maxRepetitions: exercise.maxRepetitions || 12,
          numberOfSets: 3,
        }))
      };

      console.log('Dados transformados:', backendData); // Debug
      
      const response = await api.post('/routines', backendData);
      const newRoutine = response.data;
      setRoutines((prev) => [...prev, newRoutine]);
      return newRoutine;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro Axios:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url
        });
      } else {
        console.error('Erro desconhecido:', error);
      }
      throw error;
    }
  };

  const deleteRoutine = async (id: string) => {
    try {
      await api.delete(`/routines/${id}`);
      setRoutines((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Erro ao deletar rotina:', error);
      throw error;
    }
  };

  const getRoutine = async (id: string) => {
    try {
      const response = await api.get(`/routines/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar rotina:', error);
      throw error;
    }
  };

  const updateRoutine = async (id: string, data: Partial<Routine>) => {
    try {
      const response = await api.patch(`/routines/${id}`, data);
      const updated = response.data;
      setRoutines((prev) => prev.map((r) => (r.id === id ? updated : r)));
      return updated;
    } catch (error) {
      console.error('Erro ao atualizar rotina:', error);
      throw error;
    }
  };

  return {
    routines,
    loading,
    addRoutine,
    deleteRoutine,
    updateRoutine,
    setRoutines,
    getRoutine,
  };
}