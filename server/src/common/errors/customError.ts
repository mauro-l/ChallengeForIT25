import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/loggers.js";

interface CustomError {
    statusCode: number;
    message: string;
    stack?: string;
}

export const customError = async (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal server error" : err.message;
    const stack = err.stack ? err.stack.split("\n") : [];

    const error = {
        statusCode,
        files: stack,
        message: err.message,
        path: req.originalUrl,
        method: req.method,
    };

    logger.log("error", `Status: ${statusCode} [${req.method}] ${req.originalUrl} - Message: ${err.message}`)
    console.log(error);

    res.status(statusCode).json({ message });
}