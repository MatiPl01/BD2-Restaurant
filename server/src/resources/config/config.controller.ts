import { Router, Request, Response } from 'express';
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
            .route('/')
            .get(
                selectFieldsMiddleware,
                this.getConfig
            )
            .patch(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(validate.body.updateConfig),
                updateMiddleware,
                this.updateConfig
            );
    }

    private getConfig = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const config = await this.configService.getConfig();

        await response.json(res, 200, config);
    })

    private updateConfig = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const updatedConfig = await this.configService.updateConfig(req.body);

        await response.json(res, 201, updatedConfig);
    })
}


export default ConfigController;
