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
  query: z.object({
    completed: z.boolean().optional(),
  }),
};
