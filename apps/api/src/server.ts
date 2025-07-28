// src/server.ts
import cors from 'cors';
import express from 'express';
import { env } from './lib/env';
import { authRoutes } from './routes/auth.routes';
import { profileRoutes } from './routes/profile.routes';
import { userRoutes } from './routes/user.routes';

const app = express();

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON bodies

// Register Routes
app.use(userRoutes);
app.use(authRoutes);
app.use(profileRoutes);

// Start the server
app.listen(env.PORT, () => {
    console.log(`🚀 Server listening on port ${env.PORT}`);
});