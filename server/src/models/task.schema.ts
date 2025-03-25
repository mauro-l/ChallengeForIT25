import { z } from "zod";

export const taskSchema = {
  body: z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(50, { message: "Description must be at most 50 characters long" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(250, { message: "Description must be at most 250 characters long" }),
    completed: z.boolean(),
  }),
};

export const idSchema = {
  params: z.object({
    id: z
      .string()
      .length(9, { message: "ID must be exactly 9 characters long" }),
  }),
};

export const updateTaskSchema = {
  body: z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(50, { message: "Title must be at most 50 characters long" })
      .optional(),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(250, { message: "Description must be at most 250 characters long" })
      .optional(),
    completed: z.boolean().optional(),
  }),
  params: idSchema,
};
