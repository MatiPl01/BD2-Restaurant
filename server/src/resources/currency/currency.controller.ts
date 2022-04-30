import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/currency/currency.validation';
import CurrencyService from '@/resources/currency/currency.service';
import catchAsync from "@/utils/exceptions/catchAsync";


class CurrencyController implements Controller {
    public path = '/currencies';
    public router = Router();
    private currencyService = new CurrencyService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            this.path,
            validationMiddleware(validate.getAllCurrencies),
            this.getAllCurrencies
        );
        this.router.get(
            `${this.path}/:code`,
            validationMiddleware(validate.getCurrency),
            this.getCurrency
        );
    }

    private getCurrency = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const code = req.params.code as string;
        const currency = await this.currencyService.getCurrency(code);

        res.status(201).json({ data: currency });
    })

    private getAllCurrencies = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const currencies = await this.currencyService.getAllCurrencies();

        res.status(201).json({ data: currencies })
    })
}

export default CurrencyController;
