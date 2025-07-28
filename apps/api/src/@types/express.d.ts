// src/@types/express.d.ts
// This declaration file merges our custom 'user' property into the Express Request type.

declare namespace Express {
    export interface Request {
        user?: {
            sub: string;
        };
    }
}