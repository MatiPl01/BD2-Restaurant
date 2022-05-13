import { CookieOptions, Response } from 'express';
import ResponseStatus from './enums/response-status.interface';


const getStatus = (
    statusCode: number
): string => {
    switch (Math.floor(statusCode / 100)) {
        case 1:
            return ResponseStatus.INFO;
        case 2:
            return ResponseStatus.SUCCESS;
        case 3:
            return ResponseStatus.REDIRECTION;
        case 4:
            return ResponseStatus.CLIENT_ERROR;
        case 5:
            return ResponseStatus.SERVER_ERROR;
        default:
            return ResponseStatus.UNRECOGNIZED;
    }
};

const json = async (
    res: Response,
    statusCode: number,
    data: any
): Promise<Response> => {
    return res.status(statusCode).json({
        status: getStatus(statusCode),
        data
    })
};

const cookie = async (
    res: Response,
    name: string,
    val: string,
    options: CookieOptions
): Promise<Response> => {
    console.log('Sending cookie', name, val, options)
    return res.cookie(name, val, options);
};


export default {
    json,
    cookie
};
