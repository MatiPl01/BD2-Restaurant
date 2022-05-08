import {NextFunction, Request, Response} from 'express';
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

    // Check if a it is a Bearer authentication type
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(error);
    }

    // Get JWT token from the Bearer header
    const accessToken = bearer.split('Bearer ')[1].trim();

    // Verify the token
    const payload: Token | jwt.JsonWebTokenError = await token.verify(accessToken);
    if (payload instanceof jwt.JsonWebTokenError) return next(error);

    // Select the user user belonging to the jwt token
    const user = await UserModel.findById(payload.id);
    if (!user) return next(new AppError(
        401,
        'The user belonging to this token does no longer exist.'
    ));

    // Check if the user password was changed after the token was issued
    // (The user needs to log in again using the new password)
    if (user.wasPasswordChangedAfter(payload.iat)) {
        return next(new AppError(
            401,
            'User password was recently changed. Please log in again using your new password.'
        ));
    }

    // If user meets all the conditions above, grant access to the protected route
    req.user = user;
    return next();
})


export default authenticationMiddleware;
