import { Request, Response, NextFunction } from 'express';

const parseFilters = (req: Request) => { // TODO - improve this function (move excluded parameters somewhere else)
    const queryObj = { ...req.query };
    const excludedFields = new Set(['page', 'sort', 'limit', 'fields']);
    excludedFields.forEach(field => delete queryObj[field]);
    Object.keys(queryObj).forEach(key => {
        if (typeof queryObj[key] === 'string') {
            queryObj[key] = (queryObj[key] as string).split(',');
        }
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    return JSON.parse(queryStr);
}

async function filteringMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    req.filters = parseFilters(req);
    
    next();
}

export default filteringMiddleware;
