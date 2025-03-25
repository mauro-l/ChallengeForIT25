import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

type SchemaType = {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
};

export const validateSchema = (schema: SchemaType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = [];

    if (schema.body) {
      const result = schema.body.safeParse(req.body);

      if (!result.success) {
        errors.push(
          ...result.error.errors.map((err: { path: any[]; message: any }) => ({
            field: `body.${err.path.join(".")}`,
            message: err.message,
          }))
        );
      } else {
        req.body = result.data;
      }
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);

      if (!result.success) {
        errors.push(
          ...result.error.errors.map((err: { path: any[]; message: any }) => ({
            field: `query.${err.path.join(".")}`,
            message: err.message,
          }))
        );
      }
    }

    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      if (!result.success) {
        errors.push(
          ...result.error.errors.map((err: { path: any[]; message: any }) => ({
            field: `params.${err.path.join(".")}`,
            message: err.message,
          }))
        );
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    next();
  };
};
