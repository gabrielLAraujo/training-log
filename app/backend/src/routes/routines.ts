import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function routinesRoutes(app: FastifyInstance) {
  // Listar todas as rotinas
  app.get("/routines", async (request, reply) => {
    const routines = await prisma.routine.findMany({
      include: {
        exercises: {
          include: { exercise: true }
        }
      }
    });
    return routines;
  });

  // Buscar uma rotina por ID
  app.get("/routines/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const routine = await prisma.routine.findUnique({
      where: { id },
      include: {
        exercises: {
          include: { exercise: true }
        }
      }
    });
    if (!routine) {
      return reply.status(404).send({ message: "Routine not found" });
    }
    return routine;
  });

  // Criar uma nova rotina
  app.post("/routines", async (request, reply) => {
    const { name, exercises } = request.body as {
      name: string;
      exercises: {
        exerciseId: string;
        minRepetitions: number;
        maxRepetitions: number;
        numberOfSets: number;
      }[];
    };

    const routine = await prisma.routine.create({
      data: {
        name,
        exercises: {
          create: exercises.map((ex) => ({
            exerciseId: ex.exerciseId,
            minRepetitions: ex.minRepetitions,
            maxRepetitions: ex.maxRepetitions,
            numberOfSets: ex.numberOfSets,
          })),
        },
      },
      include: {
        exercises: true,
      },
    });
    return reply.status(201).send(routine);
  });

  // Atualizar uma rotina
  app.patch("/routines/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name } = request.body as { name?: string };

    const routine = await prisma.routine.update({
      where: { id },
      data: { name },
    });

    return routine;
  });

  // Deletar uma rotina
  app.delete("/routines/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    await prisma.routine.delete({
      where: { id },
    });

    return { message: "Routine deleted successfully" };
  });
}