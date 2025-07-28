// src/index.ts
import fastify from 'fastify';
import { env } from './lib/env';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';

    // Initialize the Fastify application
    const app = fastify({
        logger: true,
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