import AppError from '@/utils/errors/app.error';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';


function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: false
        };

        try {
            req.body = await schema.validateAsync(
                req.body,
                validationOptions
            );
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            next(new AppError(400, errors.join('\n').replace(/\"/g, "'")));
        }
    };
}


export default validationMiddleware;
