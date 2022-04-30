import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/exchange-rate/exchange-rate.validation'
import ExchangeRateService from './exchange-rate.service';
import createException from "@/utils/createException";


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

    private getExchangeRate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const from = req.query.from as string;
            const to = req.query.to as string;
            const result = await this.exchangeRateService.getExchangeRate(from, to);

            res.status(201).json(result);
        } catch (error) {
            next(createException(400, error));
        }
    };
    private updateExchangeRate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const from = req.query.from as string;
            const to = req.query.to as string;
            const { ratio } = req.body;
            const result = await this.exchangeRateService.updateExchangeRate(from, to, ratio);

            res.status(201).json(result);
        } catch (error) {
            next(createException(400, error));
        }
    }
}

export default ExchangeRateController;
