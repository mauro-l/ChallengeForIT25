import { Router } from "express";
import { validateSchema } from "../common/middlewares/validateSchema.js";
import {
  idSchema,
  taskSchema,
  updateTaskSchema,
} from "../models/task.schema.js";
import { TaskController } from "../controllers/task.controller.js";

const router = Router();

router.post("/", validateSchema(taskSchema), TaskController.create);
router.get("/", TaskController.findAll);
router.get("/:id", TaskController.findOne);
router.post("/:id", validateSchema(updateTaskSchema), TaskController.update);
router.patch("/:id", validateSchema(idSchema), TaskController.toggle);
router.delete("/:id", validateSchema(idSchema), TaskController.remove);

export default router;
