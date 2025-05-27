import { z } from "zod";

export const RoutineCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export const RoutineUpdateSchema = z.object({
  name: z.string().min(1).optional(),
});