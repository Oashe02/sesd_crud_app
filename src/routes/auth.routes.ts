import { Router } from "express";
import { authcontroller } from "../controllers/auth.controller";
import { authmiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new authcontroller();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", authmiddleware, controller.getme);

export default router;
