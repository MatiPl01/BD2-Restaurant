import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import catchAsync from "@/utils/exceptions/catchAsync";


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
        const { firstName, lastName, login, email, password } = req.body;

        const token = await this.userService.register(
            firstName,
            lastName,
            login,
            email,
            password,
            [],
            req.body.roles || ['user'],
            req.body.defaultCurrency || 'USD',
            req.body.active != null ? req.body.active : true,
            req.body.bannes != null ? req.body.banned : false
        );

        res.status(201).json({ data: token });
    })

    private login = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { email, password } = req.body;

        const token = await this.userService.login(email, password);

        res.status(200).json({ data: token });
    })

    private getUser = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) throw new HttpException(404, 'No user logged in');

        res.status(200).send({ data: req.user });
    })
}

export default UserController;
