import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const workouts = await prisma.workout.findMany();
                res.status(200).json(workouts);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching workouts' });
            }
            break;
        case 'POST':
            try {
                const {token, userToken,name} = req.body;
                const work = new Workout(token, userToken,name);
                const newWorkout = await prisma.workout.create({
                    data: work,
                });
                res.status(201).json(newWorkout);
            } catch (error) {
                res.status(500).json({ error: 'Error creating workout' });
            }
            break;
        case 'PUT':
            try {
                const { token, name} = req.body;
                const updatedWorkout = await prisma.workout.update({
                    where: { token },
                    data: {
                        name,
                    },
                });
                res.status(200).json(updatedWorkout);
            } catch (error) {
                res.status(500).json({ error: 'Error updating workout' });
            }
            break;
        case 'DELETE':
            try {
                const { token } = req.body;
                await prisma.workout.delete({
                    where: { token },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: 'Error deleting workout' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}