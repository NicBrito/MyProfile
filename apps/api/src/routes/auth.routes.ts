// src/routes/auth.routes.ts
import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../lib/env';
import { prisma } from '../lib/prisma';

export const authRoutes = Router();

authRoutes.post('/sessions', async (req, res) => {
    try {
        const createSessionBody = z.object({
            email: z.string().email(),
            password: z.string(),
        });

        const { email, password } = createSessionBody.parse(req.body);

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation error', issues: error.format() });
        }
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});