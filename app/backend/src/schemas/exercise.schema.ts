import { z } from "zod";

export const ExerciseCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.string().optional(),
});

export const ExerciseUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
});