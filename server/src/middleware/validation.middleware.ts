import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

import AppError from '@/utils/errors/app.error';


const validationOptions = {
    abortEarly: false,
    allowUnknown: false
};

const validateAsync = async (
    req: Request,
    target: 'body' | 'params' | 'query',
    validators: Joi.Schema<any> | undefined
): Promise<void> => {
    if (req[target] && validators) {
        req[target] = await validators.validateAsync(
            req[target],
            validationOptions
        );
    }
};

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
        try {
            await validateAsync(req, 'body', bodyValidators);
            await validateAsync(req, 'params', paramsValidators);
            await validateAsync(req, 'query', queryValidators);
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
