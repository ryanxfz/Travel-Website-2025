import { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
){
    console.error('Unhandled error:', err);
    res.status(500).json({
        errors: ['Internal Server Error'],
    });
}