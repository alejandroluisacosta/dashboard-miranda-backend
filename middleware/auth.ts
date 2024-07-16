import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token)
        res.sendStatus(401);

    jwt.verify(token!, process.env.TOKEN_SECRET!, (err: any, user: any) => {
        if (err) return res.sendStatus(403);

        next();
    })
}