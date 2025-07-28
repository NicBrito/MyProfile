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

            // Use a Prisma transaction to create both user and profile
            const user = await prisma.$transaction(async (tx) => {
                // 1. Create the user
                const newUser = await tx.user.create({
                    data: {
                        email,
                        password_hash,
                    },
                });

                // 2. Create a corresponding profile
                // We'll generate a simple unique username for now
                const username = `user_${new Date().getTime()}`;

                await tx.profile.create({
                    data: {
                        user_id: newUser.id,
                        username: username,
                        display_name: 'New User', // Default display name
                    },
                });

                return newUser;
            });


            const { password_hash: _, ...userWithoutPassword } = user;

            return res.status(201).json(userWithoutPassword);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: 'Validation error', issues: error.format() });
            }
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    });