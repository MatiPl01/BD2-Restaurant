import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/currency/currency.validation';
import CurrencyService from '@/resources/currency/currency.service';
import createException from "@/utils/createException";


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
            `${this.path}/:code`, // FIXME - I get an error: "\"id\" is required"
            validationMiddleware(validate.getCurrency),
            this.getCurrency
        );
    }

    private getCurrency = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        console.log('here 1')
        try {
            const code = req.params.code as string;
            const currency = await this.currencyService.getCurrency(code);

            res.status(201).json({ currency })
        } catch (error) {
            next(createException(400, error));
        }
    }

    private getAllCurrencies = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        console.log('here 2')
        try {
            const currencies = await this.currencyService.getAllCurrencies();

            res.status(201).json({ currencies })
        } catch (error) {
            next(createException(400, error));
        }
    }
}

export default CurrencyController;
