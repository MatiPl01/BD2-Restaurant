import { Request, Response, Router } from 'express';
import validationMiddleware from "@/middleware/validation.middleware";
import CurrencyService from '@/resources/currency/currency.service';
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import catchAsync from "@/utils/errors/catch-async";
import response from '@/utils/response';
import validate from "@/resources/currency/currency.validation";
import RoleEnum from '@/utils/enums/role.enum';


class CurrencyController implements Controller {
    public readonly PATH = 'currencies';
    public readonly router = Router();
    private readonly currencyService = new CurrencyService();

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
            )

        this.router
            .route('/:code')
            .get(
                validationMiddleware(undefined, validate.params.currencyCode),
                this.getCurrency
            )
            .delete(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                validationMiddleware(undefined, validate.params.currencyCode),
                this.deleteCurrency
            )
    }

    private getCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const code = req.params.code as string;
        const currency = await this.currencyService.getCurrency(code);

        await response.json(res, 200, currency);
    })

    private getAllCurrencies = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const currencies = await this.currencyService.getAllCurrencies();

        await response.json(res, 200, currencies);
    })

    private createCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const currency = await this.currencyService.createCurrency(req.body);

        await response.json(res, 201, currency);
    })

    private deleteCurrency = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { code } = req.params;
        await this.currencyService.deleteCurrency(code);
        
        await response.json(res, 204, null);
    })
}


export default CurrencyController;
