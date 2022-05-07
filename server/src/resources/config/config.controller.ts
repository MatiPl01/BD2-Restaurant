import {Request, Response, Router} from 'express';
import selectFieldsMiddleware from '@/middleware/requests/select-fields.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import updateMiddleware from '@/middleware/requests/update.middleware';
import ConfigService from './config.service';
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';
import catchAsync from "@/utils/errors/catch-async";
import Controller from '@/utils/interfaces/controller.interface';
import validate from '@/resources/config/config.validation'
import RoleEnum from '@/utils/enums/role.enum';
import response from '@/utils/response';


class ConfigController implements Controller {
    public readonly PATH = 'config';
    public readonly router = Router();
    private readonly configService = new ConfigService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route('/persistence')
            .get(
                selectFieldsMiddleware,
                this.getPersistence
            );
        this.router
            .route('/persistence/:value')
            .patch(
                validationMiddleware(null, validate.paramsUpdatePersistence, null),
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                updateMiddleware,
                this.updatePersistence
            );
        this.router
            .route('/main_currency')
            .get(
                selectFieldsMiddleware,
                this.getMainCurrency
            );
        this.router
            .route('/main_currency/:value')
            .patch(
                validationMiddleware(null, validate.paramsUpdateMainCurrency, null),
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                updateMiddleware,
                this.updateMainCurrency
            );
    }

    private getPersistence = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const result = await this.configService.getPersistence();

        await response.json(res, 200, result);
    })

    private updatePersistence = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const newPersistence = req.params.value;
        const updatedPersistence = await this.configService.updatePersistence(newPersistence);

        await response.json(res, 200, updatedPersistence);
    })

    private getMainCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const result = await this.configService.getMainCurrency();

        await response.json(res, 200, result);
    })

    private updateMainCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const newMainCurrency = req.params.value;
        const updatedMainCurrency = await this.configService.updateMainCurrency(newMainCurrency);

        await response.json(res, 200, updatedMainCurrency);
    })
}


export default ConfigController;
