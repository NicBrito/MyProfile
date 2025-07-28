// src/routes/profile.routes.ts
import { Router } from 'express';
import { authenticate } from '../hooks/auth.hook';
import { prisma } from '../lib/prisma';

export const profileRoutes = Router();

// The 'authenticate' middleware is applied here before the main handler
profileRoutes.get('/me', authenticate, async (req, res) => {
    try {
        const userId = req.user!.sub;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { password_hash, ...userInfo } = user;

        return res.status(200).json(userInfo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});