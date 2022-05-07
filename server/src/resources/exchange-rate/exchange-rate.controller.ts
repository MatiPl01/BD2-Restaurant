import {Request, Response, Router} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/exchange-rate/exchange-rate.validation'
import ExchangeRateService from './exchange-rate.service';
import catchAsync from "@/utils/errors/catch-async";
import response from '@/utils/response';
import authenticate from "@/middleware/auth/authentication.middleware";
import restrictTo from "@/middleware/auth/authorization.middleware";
import RoleEnum from "@/utils/enums/role.enum";
import updateMiddleware from "@/middleware/requests/update.middleware";


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
                validationMiddleware(null, null, validate.queryExchangeRate),
                this.getExchangeRate
            )
        this.router
            .route('/:rate')
            .patch(
                validationMiddleware(null, validate.paramsUpdateExchangeRate, validate.queryExchangeRate),
                authenticate,
                restrictTo(RoleEnum.ADMIN),
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
        const result = await this.exchangeRateService.getExchangeRate(from, to);

        await response.json(res, 200, result);
    })

    private updateExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const rate = parseFloat(req.params.rate);
        const updatedExchangeRate = await this.exchangeRateService.updateExchangeRate(from, to, rate);

        await response.json(res, 200, updatedExchangeRate);
    })
}


export default ExchangeRateController;
