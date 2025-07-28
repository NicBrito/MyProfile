// src/hooks/auth.hook.ts
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../lib/env';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token not provided.' });
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
        return res.status(401).json({ message: 'Malformed authorization token.' });
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded as { sub: string };

        // If token is valid, proceed to the next handler
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}