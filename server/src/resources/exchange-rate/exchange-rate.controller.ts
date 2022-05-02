import { Router, Request, Response } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/exchange-rate/exchange-rate.validation'
import ExchangeRateService from './exchange-rate.service';
import catchAsync from "@/utils/errors/catch-async";
import response from '@/utils/response';


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
            .get(this.getExchangeRate)
            .patch(
                validationMiddleware(validate.updateExchangeRate),
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

        response.json(res, 200, result);
    })

    private updateExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const { rate } = req.body;
        const updatedExchangeRate = await this.exchangeRateService.updateExchangeRate(from, to, rate);

        response.json(res, 201, updatedExchangeRate);
    })
}


export default ExchangeRateController;
