import {NextFunction, Request, Response} from "express";
import RoleEnum from "@/utils/enums/role.enum";
import AppError from "@/utils/errors/app.error";


const authorizationMiddleware = (...roles: RoleEnum[]) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        // Go to the next middleware if the user that is logged in has at least
        // one of the specified roles
        if (req.user && roles.filter(
            role => req.user.roles.includes(role)
        ).length) return next();

        throw new AppError(403, 'You are not allowed to perform this action');
    }
}


export default authorizationMiddleware;