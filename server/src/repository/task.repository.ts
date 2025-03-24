import { getDB } from "../config/sqlite.config.js";
import Task from "../models/task.model.js";
import { nanoid } from "nanoid";
import { format } from "date-fns";

export class TaskRepository {
  static async create(task: Task): Promise<void> {
    const db = await getDB();

    const newTask = {
      id: nanoid(9),
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    };
    const query = `INSERT INTO tasks (id, title, description, completed, createdAt) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [
      newTask.id,
      newTask.title,
      newTask.description,
      newTask.completed,
      newTask.createdAt,
    ]);
  }

  static async findAll(completed?: boolean): Promise<Task[]> {
    const db = await getDB();

    let query = `SELECT * FROM tasks`;
    const params: any[] = [];

    if (completed !== undefined) {
      query += `WHERE completed = ?`;
      params.push(completed ? 1 : 0);
    }

    const row = await db.all(query, params);
    return row;
  }

  static async findOne(id: Task["id"]): Promise<Task> {
    const db = await getDB();

    const query = `SELECT * FROM tasks WHERE id = ?`;
    const task = await db.get(query, [id]);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    return task;
  }

  static async toggleComplete(
    id: Task["id"],
    completed: boolean
  ): Promise<Task> {
    const db = await getDB();

    const query = `UPDATE tasks SET completed = ? WHERE id = ?`;
    await db.run(query, [completed, id]);

    const udpateQuery = `SELECT * FROM tasks WHERE id = ?`;
    const updateTask = await db.get(udpateQuery, [id]);

    if (!updateTask) {
      throw new Error(`Task with id ${id} not found after update`);
    }

    return updateTask;
  }

  static async update(id: Task["id"], updates: Partial<Task>): Promise<Task> {
    const db = await getDB();

    if (Object.keys(updates).length === 0) {
      throw new Error("No fields provided for update");
    }

    const setClause = Object.keys(updates)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = [...Object.values(updates), id];

    const query = `UPDATE tasks SET ${setClause} WHERE id = ?`;
    await db.run(query, values);

    const updatedTask = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);

    if (!updatedTask) {
      throw new Error(`Task with id ${id} not found after update`);
    }

    return updatedTask;
  }

  static async remove(id: Task["id"]): Promise<void> {
    const db = await getDB();
    const query = `DELETE FROM tasks WHERE id = ?`;
    await db.run(query, [id]);
  }
}
