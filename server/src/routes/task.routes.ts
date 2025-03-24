import { Router } from "express";
import { validateSchema } from "../common/middlewares/validateSchema.js";
import { taskSchema } from "../models/task.schema.js";
import { TaskController } from "../controllers/task.controller.js";

const router = Router();

router.post("/", validateSchema(taskSchema), TaskController.create);
router.get("/", TaskController.findAll);
router.get("/:id", TaskController.findOne);
router.post("/:id", validateSchema(taskSchema), TaskController.update);
router.patch("/:id", TaskController.toggle);
router.delete("/:id", TaskController.remove);

export default router;
