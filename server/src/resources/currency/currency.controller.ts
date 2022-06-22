import { Request, Response, Router } from 'express';

import validationMiddleware from '@/middleware/validation.middleware';
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';

import Controller from '@/utils/interfaces/controller.interface';
import catchAsync from '@/utils/errors/catch-async';
import response from '@/utils/response';
import RoleEnum from '@/utils/enums/role.enum';

import currencyService from './currency.service';
import validate from './currency.validation';
import handlerFactory from '../shared/handlerFactory';
import currencyModel from './currency.model';


class CurrencyController implements Controller {
    public readonly PATH = 'currencies';
    public readonly router = Router();
    private readonly currencyService = currencyService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route('/')
            .get(this.getAllCurrencies)
            .post(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(validate.body.createCurrency),
                this.createCurrency
            );

        this.router
            .route('/:code')
            .get(
                validationMiddleware(undefined, validate.params.currencyCode),
                this.getCurrency
            )
            .delete( // TODO - add trigger to delete all exchange rates with this currency
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(undefined, validate.params.currencyCode),
                this.deleteCurrency
            );
    }

    private getCurrency = handlerFactory.findOne(currencyModel, {
        params: ['code'] 
    });

    private getAllCurrencies = handlerFactory.findMany(currencyModel);

    private createCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const currency = await this.currencyService.createCurrency(req.body);

        await response.json(res, 201, currency);
    });

    private deleteCurrency = handlerFactory.deleteOne(
        currencyModel, 
        { params: ['code'] }
    );
}


// Create and export currency controller singleton instance
export default new CurrencyController();
