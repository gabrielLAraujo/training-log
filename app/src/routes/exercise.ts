// backend/src/routes/exercise.ts
import { FastifyInstance } from 'fastify';
import { prisma } from '../../backend/src/routes/lib/prisma';

export async function exerciseRoutes(app: FastifyInstance) {
  app.get('/exercises', async (request, reply) => {
    const exercises = await prisma.exercise.findMany();
    return exercises;
  });

  app.post('/exercises', async (request, reply) => {
    const { name, category } = request.body as { name: string; category?: string };
    const exercise = await prisma.exercise.create({
      data: { name, category },
    });
    return exercise;
  });
}