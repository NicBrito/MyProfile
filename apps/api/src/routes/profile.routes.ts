// src/routes/profile.routes.ts
import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../hooks/auth.hook';
import { prisma } from '../lib/prisma';

    export const profileRoutes = Router();

    // The 'authenticate' middleware is applied here before all handlers in this file
    profileRoutes.use(authenticate);

    // GET /me - Fetches the current user's profile
    profileRoutes.get('/me', async (req, res) => {
        try {
            const userId = req.user!.sub;

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    profile: true, // Also fetch the related profile data
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

    // PUT /me - Updates the current user's profile
    profileRoutes.put('/me', async (req, res) => {
        try {
            const userId = req.user!.sub;

            // 1. Validate the request body
            const updateProfileBody = z.object({
                display_name: z.string().min(1).max(50).optional(),
                bio: z.string().max(160).optional(),
                // We can add avatar_url and other fields here later
            });

            const dataToUpdate = updateProfileBody.parse(req.body);

            // 2. Update the profile in the database
            const updatedProfile = await prisma.profile.update({
                where: {
                    user_id: userId,
                },
                data: dataToUpdate,
            });

            return res.status(200).json(updatedProfile);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: 'Validation error', issues: error.format() });
            }
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    });