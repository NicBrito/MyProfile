// src/routes/user.routes.ts
import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const userRoutes = Router();

userRoutes.post('/users', async (req, res) => {
    try {
        const createUserBody = z.object({
            email: z.string().email('Invalid email format.'),
            password: z.string().min(6, 'Password must be at least 6 characters long.'),
        });

        const { email, password } = createUserBody.parse(req.body);

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        const password_hash = await bcrypt.hash(password, 8);

        const user = await prisma.user.create({
            data: {
                email,
                password_hash,
            },
        });

        const { password_hash: _, ...userWithoutPassword } = user;

        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        // Handle validation errors or other issues
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation error', issues: error.format() });
        }
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});