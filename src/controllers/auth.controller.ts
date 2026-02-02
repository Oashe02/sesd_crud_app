import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { usermodel } from "../models/user.model";

export class authcontroller {
    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, email, password } = req.body;

            const existingUser = await usermodel.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            const user = new usermodel({ username, email, password });
            await user.save();

            const secret = process.env.JWT_SECRET || "defaultsecret";
            const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "7d" });

            res.status(201).json({
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            const user = await usermodel.findOne({ email });
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const secret = process.env.JWT_SECRET || "defaultsecret";
            const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "7d" });

            res.status(200).json({
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    getme = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = (req as any).user?.id;
            const user = await usermodel.findById(userId).select("-password");

            if (!user) {
                res.status(404).json({ message: "User nahi mila" });
                return;
            }

            res.status(200).json({ data: user });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}
