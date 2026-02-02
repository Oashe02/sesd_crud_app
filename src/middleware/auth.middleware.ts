import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { id: string; email: string };
}

export const authmiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ message: "Token nahi mila" });
            return;
        }

        const secret = process.env.JWT_SECRET || "defaultsecret";
        const decoded = jwt.verify(token, secret) as { id: string; email: string };

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
