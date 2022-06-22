import { NextFunction, Request, Response } from 'express';


const parseFilters = (req: Request) => {
    const queryObj = { ...req.query };

    const excludedFields = new Set(['page', 'sort', 'limit', 'fields', 'currency']);
    excludedFields.forEach(field => delete queryObj[field]);
    Object.keys(queryObj).forEach(key => {
        let obj: { [key: string]: any } = queryObj[key] as { [key: string]: any };

        if (typeof obj === 'string') {
            queryObj[key] = (obj as string).split(',');
        }

        // Convert numeric strings to numbers
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
            Object.entries(obj).forEach(([k, v]) => {
                if (!isNaN(v as any)) obj[k] = +v;
            })
        }
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    return JSON.parse(queryStr);
}

const filteringMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    req.filters = parseFilters(req);
    next();
}


export default filteringMiddleware;
