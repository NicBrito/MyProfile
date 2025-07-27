// src/index.ts
import fastify from 'fastify';
import { userRoutes } from './routes/user.routes';

const app = fastify({
    logger: true,
});

// Registers the user routes module
app.register(userRoutes);

const start = async () => {
    try {
        await app.listen({ port: 3333, host: '0.0.0.0' });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();