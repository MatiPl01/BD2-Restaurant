import { Request, Response, Router } from 'express';

import validationMiddleware from '@/middleware/validation.middleware';
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';

import Controller from '@/utils/interfaces/controller.interface';
import catchAsync from '@/utils/errors/catch-async';
import AppError from '@/utils/errors/app.error';
import response from '@/utils/response';
import RoleEnum from '@/utils/enums/role.enum';

import exchangeRateService from './exchange-rate.service';
import validate from './exchange-rate.validation'


class ExchangeRateController implements Controller {
    public readonly PATH = 'exchange-rates';
    public readonly router = Router();
    private readonly exchangeRateService = exchangeRateService;

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
            .delete(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(undefined, undefined, validate.query.exchangeRate),
                this.deleteExchangeRate
            );
    }

    private getExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { from, to, date } = req.query;

        const exchangeRate = await this.exchangeRateService.getExchangeRate(
            from as string, 
            to as string,
            date as Date | undefined
        );

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

    private deleteExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const date = req.query.date && new Date(req.query.date as string);
        await this.exchangeRateService.deleteExchangeRate(from, to, date);
        await response.json(res, 204, null);
    })
}


// Create and export exchange rate controller singleton instance
export default new ExchangeRateController();
