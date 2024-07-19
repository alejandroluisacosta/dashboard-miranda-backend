import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function authenticateTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            res.sendStatus(401);
            return;
        }

        jwt.verify(token!, process.env.TOKEN_SECRET!, (err: any) => {
            if (err) {
                res.sendStatus(403);
                return;
            }

            next();
        });
    } catch(error) {
        res.sendStatus(500);
    }
}