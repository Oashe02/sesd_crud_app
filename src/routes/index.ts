import { Router } from "express";
import customerRoutes from "./customer.routes";
import accountRoutes from "./account.routes";
import transactionRoutes from "./transaction.routes";
import authRoutes from "./auth.routes";
import { authmiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.use("/auth", authRoutes);

// Protected routes - JWT required
router.use("/customers", authmiddleware, customerRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);

export default router;
