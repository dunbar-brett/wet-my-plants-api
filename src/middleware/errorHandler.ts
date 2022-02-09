import { Request, Response, NextFunction } from "express";

import { CustomError } from "utils/customError";

export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.HttpStatusCode).json(error.JSON);
}