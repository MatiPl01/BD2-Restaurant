import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/currencies/currencies.validation';
import CurrenciesService from '@/resources/currencies/currencies.service';

class CurrenciesController implements Controller {
    public path = '/currencies';
    public router = Router();
    private CurrenciesService = new CurrenciesService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            `${this.path}`,
            validationMiddleware(validate.getCurrency),
            this.getCurrency
        );
        this.router.get(
            `${this.path}`,
            validationMiddleware(validate.getAllCurrencies),
            this.getAllCurrencies
        );
    }

    private getCurrency = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const currency = await this.CurrenciesService.getCurrency(id);

            res.status(201).json({ currency })
        } catch (error) {
            next(new HttpException(400, 'Cannot find Currency'));
        }
    }

    private getAllCurrencies = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const currencies = await this.CurrenciesService.getAllCurrencies();

            res.status(201).json({ currencies })
        } catch (error) {
            next(new HttpException(400, 'Cannot find all currencies'));
        }
    }
}

export default CurrenciesController;
