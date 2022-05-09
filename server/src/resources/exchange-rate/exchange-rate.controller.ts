import {Request, Response, Router} from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import ExchangeRateService from './exchange-rate.service';
import updateMiddleware from "@/middleware/requests/update.middleware";
import authenticate from "@/middleware/auth/authentication.middleware";
import restrictTo from "@/middleware/auth/authorization.middleware";
import catchAsync from "@/utils/errors/catch-async";
import Controller from '@/utils/interfaces/controller.interface';
import validate from '@/resources/exchange-rate/exchange-rate.validation'
import response from '@/utils/response';
import RoleEnum from "@/utils/enums/role.enum";
import AppError from '@/utils/errors/app.error';


class ExchangeRateController implements Controller {
    public readonly PATH = 'exchange-rates';
    public readonly router = Router();
    private readonly exchangeRateService = new ExchangeRateService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route('/')
            .get(
                validationMiddleware(undefined, undefined, validate.query.exchangeRate),
                this.getExchangeRate
            )
            .post(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(validate.body.createExchangeRate),
                this.createExchangeRate
            )
            .patch(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(validate.body.updateExchangeRate, undefined, validate.query.exchangeRate),
                updateMiddleware,
                this.updateExchangeRate
            );
    }

    private getExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const exchangeRate = await this.exchangeRateService.getExchangeRate(from, to);

        await response.json(res, 200, exchangeRate);
    })

    private createExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const data = req.body;
        if (data.from === data.to) {
            throw new AppError(400, 'Unable to create exchange rate to the same value as initial');
        }
        const exchangeRate = await this.exchangeRateService.createExchangeRate(data);

        await response.json(res, 201, exchangeRate);
    })

    private updateExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const {rate} = req.body;
        const updatedExchangeRate = await this.exchangeRateService.updateExchangeRate(from, to, rate);

        await response.json(res, 200, updatedExchangeRate);
    })
}


export default ExchangeRateController;