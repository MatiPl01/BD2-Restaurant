import { NextFunction, Request, Response } from "express";
import AppError from "./app.error"


const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // If an error occurred while executing a function,
        // catch this error and pass it to the next function
        fn(req, res, next).catch(next);
    }
}


export default catchAsync;
