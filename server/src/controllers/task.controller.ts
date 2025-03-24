import { NextFunction, Request, Response } from "express";
import { TaskRepository } from "../repository/task.repository.js";
import { logger } from "../common/utils/loggers.js";

export class TaskController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await TaskRepository.create(req.body);
      res
        .status(201)
        .json({ status: "success", message: "Task created successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await TaskRepository.findAll();
      res.status(200).json({ status: "success", payload: tasks });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await TaskRepository.findOne(id);
      res.status(200).json({ status: "success", payload: task });
    } catch (err) {
      next(err);
    }
  }

  static async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { completed } = req.body;

      const updateTask = await TaskRepository.toggleComplete(id, completed);

      res.status(200).json({ status: "success", payload: updateTask });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await TaskRepository.update(id, req.body);

      res.status(200).json({ status: "success", payload: task });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await TaskRepository.remove(id);
      res.status(200).json({
        status: "success",
        message: `Task with id: ${id} was deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}
