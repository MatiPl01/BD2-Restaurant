import { NextFunction, Request, Response } from 'express';


const parseNestedObjects = (nestedObject: { [key: string]: any }) => {
    const final: { [key: string]: any } = {};

    Object.keys(nestedObject).forEach(k => {
        if (typeof nestedObject[k] === 'object' && !Array.isArray(nestedObject[k])) {
            const res = parseNestedObjects(nestedObject[k]);
            Object.keys(res).forEach(a => {
                final[`${k}.${a}`] = res[a];
            })
        }
        else
            final[k] = nestedObject[k];
    })
    return final;
}

const updateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    req.body = parseNestedObjects(req.body);

    next();
}


export default updateMiddleware;
