import { Request, Response, NextFunction } from 'express';
import UserModel from '@/resources/user/user.model';
import AppError from '@/utils/errors/app.error';
import Token from '@/utils/interfaces/token.interface';
import token from '@/utils/token';
import jwt from 'jsonwebtoken';
import catchAsync from '@/utils/errors/catch-async';


const authenticationMiddleware = catchAsync(async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const bearer = req.headers.authorization;
    const error = new AppError(401, 'Unauthorized');

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(error);
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) return next(error);

    const user = await UserModel.findById(payload.id)
        .select('-password')
        .exec();

    if (!user) return next(new AppError(401, 'The user belonging to this token does no longer exist.'));

    req.user = user;

    return next();
})


export default authenticationMiddleware;
