// src/routes/auth.routes.ts
import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../lib/env';
import { prisma } from '../lib/prisma';

    export async function authRoutes(app: FastifyInstance) {
        app.post('/sessions', async (request, reply) => {
            // 1. Validate the request body
            const createSessionBody = z.object({
                email: z.string().email(),
                password: z.string(),
            });

            const { email, password } = createSessionBody.parse(request.body);

            // 2. Find the user by email
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return reply.status(401).send({ message: 'Invalid credentials.' });
            }

            // 3. Compare the provided password with the stored hash
            const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordCorrect) {
                return reply.status(401).send({ message: 'Invalid credentials.' });
            }

            // 4. Generate a JWT token using the standard library
            const token = jwt.sign(
                {
                    // Payload: information to store in the token
                    sub: user.id, // 'sub' is the standard JWT claim for subject (user ID)
                },
                env.JWT_SECRET, // The secret comes from our validated environment variables
                {
                    // Options
                    expiresIn: '7d', // Token will expire in 7 days
                },
            );

            // 5. Return the token
            return reply.status(200).send({ token });
        });
    }