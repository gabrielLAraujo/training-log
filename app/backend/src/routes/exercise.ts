// backend/src/routes/exercise.ts
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function exerciseRoutes(app: FastifyInstance) {
  app.get('/exercises', async (request, reply) => {
    const exercises = await prisma.exercise.findMany();
    return exercises;
  });
  app.get('/exercises/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });
    if (!exercise) {
      reply.status(404).send({ message: 'Exercise not found' });
      return;
    }
    return exercise;
  });

  app.post('/exercises', async (request, reply) => {
    const { name, category } = request.body as { name: string; category?: string };
    const exercise = await prisma.exercise.create({
      data: { name, category },
    });
    return exercise;
  });
  app.patch('/exercises/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, category } = request.body as { name?: string; category?: string };

    const exercise = await prisma.exercise.update({
      where: { id },
      data: { name, category },
    });

    return exercise;
  })
  app.delete('/exercises/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    await prisma.exercise.delete({
      where: { id },
    });

    return { message: 'Exercise deleted successfully' };
  });
}