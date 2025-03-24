import { AppError } from "./appError.js";

export class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden Error") {
        super(message, 403);
    }
}

export class DatabaseError extends AppError {
    constructor(message = "Database Error") {
        super(message, 500);
    }
}
