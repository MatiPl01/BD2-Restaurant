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
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        // this.router.post(
        //     `${this.path}`,
        //     validationMiddleware(validate.create),
        //     this.create
        // );
        this.router.get(
            `${this.path}`,
            validationMiddleware(validate.getCurrencies),
            this.getCurrencies
        )
    }

    // private create = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<Response | void> => {
    //     try {
    //         const {code,symbol,name} = req.body;
    //
    //         const currencies = await this.CurrenciesService.create(code,symbol,name);
    //
    //         res.status(201).json({ currencies });
    //     } catch (error) {
    //         next(new HttpException(400, 'Cannot create currencies'));
    //     }
    // };

    private getCurrencies = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {id}=req.body;

            const currencies = await this.CurrenciesService.getCurrencies(id);

            res.status(201).json({currencies})
        }catch (error){
            next(new HttpException(400, 'Cannot find currencies'));
        }
    }
}

export default CurrenciesController;
