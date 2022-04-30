import createException from '@/utils/exceptions/createException';
import { Request, Response, NextFunction } from 'express';

const parseFields = (fields: string) => {
    let mode = 0;
    const error = new Error("Inconsistent parameters select options.");
    const result: { [key: string]: number } = {};

    fields.split(',').forEach(field => {
        // Don't allow mixed option types (allow only include or only exclude options)
        if (field.startsWith('-')) {
            if (mode == 1) throw error;
            mode = -1;
            result[field.slice(1)] = 0;
        } else {
            if (mode == -1) throw error;
            mode = 1;
            result[field] = 1;
        }
    });

    return result;
}

async function selectFieldsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    if (typeof req.query.fields === 'string') {
        try {
            req.fields = parseFields(req.query.fields);
        } catch (error) {
            next(createException(400, error));
        }
    } else {
        req.fields = {};
    }

    next();
}

export default selectFieldsMiddleware;
