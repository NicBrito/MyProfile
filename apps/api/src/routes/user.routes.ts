// src/routes/user.routes.ts
import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', async (request, reply) => {
        // 1. Validate the request body data
        const createUserBody = z.object({
            email: z.string().email('Invalid email format.'),
            password: z.string().min(6, 'Password must be at least 6 characters long.'),
        });

        const { email, password } = createUserBody.parse(request.body);

        // 2. Check if the email already exists
        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return reply.status(409).send({ message: 'Email already registered.' }); // 409 Conflict
        }

        // 3. Hash the password
        const password_hash = await bcrypt.hash(password, 8);

        // 4. Create the user in the database
        const user = await prisma.user.create({
            data: {
                email,
                password_hash,
            },
        });

        // 5. Return a success response without the password
        return reply.status(201).send({
            id: user.id,
            email: user.email,
            created_at: user.created_at,
        });
    });
}