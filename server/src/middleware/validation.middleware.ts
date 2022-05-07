import AppError from '@/utils/errors/app.error';
import {NextFunction, Request, RequestHandler, Response} from 'express';
import Joi from 'joi';


const validationMiddleware = (schemaBody: Joi.Schema | null, schemaParams: Joi.Schema | null, schemaQuery: Joi.Schema | null): RequestHandler => {
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
            if (schemaBody !== null) {
                req.body = await schemaBody.validateAsync(
                    req.body,
                    validationOptions
                );
            }
            if (schemaParams !== null) {
                req.params = await schemaParams.validateAsync(
                    req.params,
                    validationOptions
                )
            }
            if (schemaQuery !== null) {
                req.query = await schemaQuery.validateAsync(
                    req.query,
                    validationOptions
                )
            }
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            next(new AppError(400, errors.join('\n').replace(/"/g, "'")));
        }
    };
}


export default validationMiddleware;
