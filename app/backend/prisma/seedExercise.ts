import 'dotenv/config';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { Exercise as FreeExercise } from '../src/types/exercise';

const prisma = new PrismaClient();
const URL =
  'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';

async function main() {
  console.log('🔄 Buscando exercícios em', URL);
  const { data: exercises } = await axios.get<FreeExercise[]>(URL);

  for (const ex of exercises) {
    await prisma.exercise.upsert({
      where: { id: ex.id },
      update: {
        name: ex.name,
        force: ex.force ?? null,
        level: ex.level,
        mechanic: ex.mechanic ?? null,
        equipment: ex.equipment ?? null,
        primaryMuscles: ex.primaryMuscles,
        secondaryMuscles: ex.secondaryMuscles,
        instructions: ex.instructions,
        images: ex.images ?? [],
        category: ex.category,
      },
      create: {
        id: ex.id,
        name: ex.name,
        force: ex.force ?? null,
        level: ex.level,
        mechanic: ex.mechanic ?? null,
        equipment: ex.equipment ?? null,
        primaryMuscles: ex.primaryMuscles,
        secondaryMuscles: ex.secondaryMuscles,
        instructions: ex.instructions,
        images: ex.images ?? [],
        category: ex.category,
      },
    });
    console.log(`✅ Upserted exercício: ${ex.name} (${ex.id})`);
  }
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
