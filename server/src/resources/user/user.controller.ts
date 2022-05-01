import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import authenticated from '@/middleware/authenticated.middleware';
import UserService from '@/resources/user/user.service';
import Controller from '@/utils/interfaces/controller.interface';
import catchAsync from "@/utils/errors/catch-async";
import AppError from '@/utils/errors/app.error';
import validate from '@/resources/user/user.validation';


class UserController implements Controller {
    public readonly PATH = 'users';
    public readonly router = Router();
    private readonly userService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route('/')
            .get(
                authenticated,
                this.getUser
            );

        this.router
            .route('/register')
            .post(
                validationMiddleware(validate.register),
                this.register
            );

        this.router
            .route('/login')
            .post(
                validationMiddleware(validate.login),
                this.login
            );
    }

    private register = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { firstName, lastName, login, email, password, defaultCurrency } = req.body;

        const token = await this.userService.register(
            firstName,
            lastName,
            login,
            email,
            password,
            [],
            ['user'],
            defaultCurrency || 'PLN'
        );

        res.status(201).json({ 
            status: 'success',
            data: token 
        });
    })

    private login = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { email, password } = req.body;

        const token = await this.userService.login(email, password);

        res.status(200).json({ 
            status: 'success',
            data: token 
        });
    })

    private getUser = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) throw new AppError(404, 'No user logged in');

        res.status(200).send({ 
            status: 'success',
            data: req.user 
        });
    })
}


export default UserController;
