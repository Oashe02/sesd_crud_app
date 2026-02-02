import { Router } from "express";
import customerRoutes from "./customer.routes";
import accountRoutes from "./account.routes";

const router = Router();

router.use("/customers", customerRoutes);
router.use("/accounts", accountRoutes);

export default router;
