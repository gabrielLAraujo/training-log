import { config } from 'dotenv';
import Fastify from 'fastify';

// Carrega o .env da raiz do projeto
config({ path: '../../../.env' });

const fastify = Fastify({ logger: true });

// Debug: mostra onde está procurando e o que encontrou
console.log('Current directory:', __dirname);
console.log('Looking for .env at:', '../../../.env');
console.log('Database URL:', process.env.DATABASE_URL);
console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('DATABASE')));

// Registrar CORS
fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:3000'], // Frontend URL
});

// Rota de teste
fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

// Rotas de rotinas
fastify.get('/routines', async (request, reply) => {
  // Aqui você implementaria a busca no banco
  return [];
});

interface CreateRoutineBody {
  name: string;
  exercises: any[];
  // outros campos da rotina
}

fastify.post('/routines', async (request, reply) => {
  const routine = request.body as CreateRoutineBody;
  return { id: Date.now().toString(), ...routine };
});

// Iniciar servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3333, host: '0.0.0.0' });
    console.log('🚀 Server running on http://localhost:3333');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
