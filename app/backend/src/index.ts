import { config } from 'dotenv';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { routinesRoutes } from './routes/routines';
import { exerciseRoutes } from './routes/exercise';

// Load environment variables
config({ path: '../../../.env' });

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'];

const fastify: FastifyInstance = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
});

// Register CORS, routes inside start function

// Health check route
fastify.get('/health', async () => {
  return { 
    status: 'ok',
    timestamp: new Date().toISOString()
  };
});

// Graceful shutdown handler
const closeGracefully = async (signal: string) => {
  console.log(`Received signal to terminate: ${signal}`);
  
  await fastify.close();
  process.exit(0);
};

process.on('SIGINT', () => closeGracefully('SIGINT'));
process.on('SIGTERM', () => closeGracefully('SIGTERM'));


const start = async () => {
  try {
    // Register CORS
    await fastify.register(cors, {
      origin: CORS_ORIGINS,
      credentials: true,
    });

    // Register routes
    await fastify.register(routinesRoutes);
    await fastify.register(exerciseRoutes);

    await fastify.listen({ port: PORT, host: HOST });
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});