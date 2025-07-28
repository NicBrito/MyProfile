// src/index.ts
import jwt from '@fastify/jwt';
import 'dotenv/config'; // Loads environment variables from .env file
import fastify from 'fastify';
import { z } from 'zod';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';

// Initialize the Fastify application
const app = fastify({
    logger: true,
});

// --- Environment Variable Validation ---
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('❌ Invalid environment variables:', _env.error.format());
    throw new Error('Invalid environment variables.');
}
const env = _env.data;
// --- End of Validation ---

// Register JWT plugin
app.register(jwt, {
    secret: env.JWT_SECRET,
});

// Register route modules
app.register(userRoutes);
app.register(authRoutes);

// Function to start the server
const start = async () => {
    try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    } catch (err) {
    app.log.error(err);
    process.exit(1);
    }
};

// Start the server
start();