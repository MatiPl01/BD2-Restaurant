import RolesEnum from "@/utils/enums/roles.enum";
import { Request, Response, NextFunction } from "express";


const authorizationMiddleware = async (...roles: RolesEnum[]) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

    }
}


export default authorizationMiddleware;
