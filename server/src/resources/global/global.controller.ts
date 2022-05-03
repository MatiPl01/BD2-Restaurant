import { Router, Request, Response } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import GlobalService from './global.service';
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';
import catchAsync from "@/utils/errors/catch-async";
import Controller from '@/utils/interfaces/controller.interface';
import validate from '@/resources/global/global.validation'
import RoleEnum from '@/utils/enums/role.enum';
import response from '@/utils/response';


class GlobalController implements Controller {
    public readonly PATH = 'globals';
    public readonly router = Router();
    private readonly globalService = new GlobalService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route('/persistence')
            .get(this.getPersistence)
            .patch(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(validate.updatePersistence),
                this.updatePersistence
            );
            
        this.router
            .route('/main-currency')
            .get(this.getMainCurrency)
            .patch(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(validate.updateMainCurrency),
                this.updateMainCurrency
            );
    }

    private getPersistence = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const result = await this.globalService.getPersistence();

        response.json(res, 200, result);
    })

    private updatePersistence = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const newPersistence = req.body.persistence
        const updatedPersistence = await this.globalService.updatePersistence(newPersistence);

        response.json(res, 201, updatedPersistence);
    })

    private getMainCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const result = await this.globalService.getMainCurrency();

        response.json(res, 200, result);
    })

    private updateMainCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const newMainCurrency = req.body.mainCurrency
        const updatedMainCurrency = await this.globalService.updateMainCurrency(newMainCurrency);

        response.json(res, 201, updatedMainCurrency);
    })
}


export default GlobalController;
