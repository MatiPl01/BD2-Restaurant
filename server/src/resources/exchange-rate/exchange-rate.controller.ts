import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/exchange-rate/exchange-rate.validation'
import ExchangeRateService from './exchange-rate.service';
import createException from "@/utils/exceptions/createException";
import catchAsync from "@/utils/exceptions/catchAsync";


class ExchangeRateController implements Controller {
    public path = '/exchange-rates';
    public router = Router();
    private exchangeRateService = new ExchangeRateService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            this.path,
            validationMiddleware(validate.getExchangeRate),
            this.getExchangeRate
        );
        this.router.patch(
            this.path,
            validationMiddleware(validate.updateExchangeRate),
            this.updateExchangeRate
        );
    }

    private getExchangeRate = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const result = await this.exchangeRateService.getExchangeRate(from, to);

        res.status(201).json({ data: result });
    })

    private updateExchangeRate = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const { ratio } = req.body;
        const result = await this.exchangeRateService.updateExchangeRate(from, to, ratio);

        res.status(201).json({ data: result });
    })
}

export default ExchangeRateController;
