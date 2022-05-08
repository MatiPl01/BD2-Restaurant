import {NextFunction, Request, RequestHandler, Response} from 'express';
import AppError from '@/utils/errors/app.error';
import Joi from 'joi';


const validationMiddleware = (
    bodyValidators?: Joi.Schema,
    paramsValidators?: Joi.Schema,
    queryValidators?: Joi.Schema
): RequestHandler => {
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
            if (bodyValidators) {
                req.body = await bodyValidators.validateAsync(
                    req.body,
                    validationOptions
                );
            }
            if (paramsValidators) {
                req.params = await paramsValidators.validateAsync(
                    req.params,
                    validationOptions
                )
            }
            if (queryValidators) {
                req.query = await queryValidators.validateAsync(
                    req.query,
                    validationOptions
                )
            }

            next();
        } catch (err: any) {
            const errors: string[] = [];
            err.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            next(new AppError(400, errors.join('\n').replace(/"/g, "'")));
        }
    };
}


export default validationMiddleware;