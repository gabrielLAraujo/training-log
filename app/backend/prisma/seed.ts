import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Caminho para os arquivos de exercícios
  const exercisesDir = path.join(__dirname, '../../public/exercises');
  
  // Verificar se o diretório existe
  if (!fs.existsSync(exercisesDir)) {
    console.error('❌ Diretório de exercícios não encontrado:', exercisesDir);
    return;
  }

  // Ler todos os arquivos JSON
  const files = fs.readdirSync(exercisesDir).filter(file => file.endsWith('.json'));
  console.log(`📁 Encontrados ${files.length} arquivos de exercícios`);

  let count = 0;
  
  for (const file of files) {
    try {
      const filePath = path.join(exercisesDir, file);
      const exerciseData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Verificar se o exercício já existe
      const existingExercise = await prisma.exercise.findFirst({
        where: { name: exerciseData.name }
      });

      if (!existingExercise) {
        await prisma.exercise.create({
          data: {
            id: exerciseData.id,
            name: exerciseData.name,
            category: exerciseData.category || 'strength'
          }
        });
        count++;
      }
    } catch (error) {
      console.error(`❌ Erro ao processar ${file}:`, error);
    }
  }

  console.log(`✅ Seed concluído! ${count} exercícios adicionados ao banco de dados.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 