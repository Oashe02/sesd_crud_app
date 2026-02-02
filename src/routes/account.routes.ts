import { Router } from "express";
import { accountcontroller } from "../controllers/account.controller";

const router = Router();
const controller = new accountcontroller();

router.get("/", controller.getall);
router.get("/:id", controller.getbyid);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
