import { Router } from "express";
import { custcontroller } from "../controllers/customer.controller";

const router = Router();
const controller = new custcontroller();

router.get("/", controller.getallcust);
router.get("/:id", controller.getcustbyid);
router.post("/", controller.createcust);
router.put("/:id", controller.updatecust);
router.delete("/:id", controller.deletecust);

export default router;
