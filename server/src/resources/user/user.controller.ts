import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import createException from "@/utils/createException";
import User from './user.model';


class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private userService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register.bind(this)
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login.bind(this)
        );
        this.router.get(
            this.path,
            authenticated,
            UserController.getUser
        );
    }

    private async register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
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

            res.status(201).json({ token });
        } catch (error) {
            next(createException(400, error));
        }
    };

    private async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { email, password } = req.body;

            const token = await this.userService.login(email, password);

            res.status(200).json({ token });
        } catch (error) {
            next(createException(400, error));
        }
    };

    private static getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).send({ data: req.user });
    };
}

export default UserController;
