import { Router } from "express";
import { transactioncontroller } from "../controllers/transaction.controller";

const router = Router();
const controller = new transactioncontroller();

router.get("/", controller.getall);
router.get("/:id", controller.getbyid);
router.post("/", controller.create);
router.delete("/:id", controller.delete);

export default router;
