import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import ExchangeRateService from './exchangeRate.service';
import validate from '@/resources/exchangeRates/exchangeRate.validation'


class ExchangeRateController implements Controller {
    public path = '/exchangeRates';
    public router = Router();
    private ExchangeRateService = new ExchangeRateService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            `${this.path}/one`,
            validationMiddleware(validate.getExchangeRate),
            this.getExchangeRate
        );
        this.router.post(
            `${this.path}/changeRatio`,
            validationMiddleware(validate.changeRatio),
            this.changeRatio
        );
    }

    private getExchangeRate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {from,to} = req.body;
            const currency = await this.ExchangeRateService.getExchangeRate(from,to);

            res.status(201).json({ currency })
        } catch (error) {
            next(new HttpException(400, 'Cannot find Currency'));
        }
    };
    private changeRatio = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {ratio,from,to} = req.body;
            const currency = await this.ExchangeRateService.changeRatio(ratio,from,to);

            res.status(201).json({ currency })
        } catch (error) {
            next(new HttpException(400, 'Cannot change ratio'));
        }
    }
}

export default ExchangeRateController;
