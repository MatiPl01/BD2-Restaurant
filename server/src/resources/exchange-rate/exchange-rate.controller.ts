import { Router, Request, Response } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/exchange-rate/exchange-rate.validation'
import ExchangeRateService from './exchange-rate.service';
import catchAsync from "@/utils/exceptions/catchAsync";


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
    ): Promise<Response | void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const result = await this.exchangeRateService.getExchangeRate(from, to);

        res.status(200).json({ data: result });
    })

    private updateExchangeRate = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const { ratio } = req.body;
        const updatedExchangeRate = await this.exchangeRateService.updateExchangeRate(from, to, ratio);

        res.status(201).json({ data: updatedExchangeRate });
    })
}

export default ExchangeRateController;
