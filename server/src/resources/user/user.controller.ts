import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';
import UserService from '@/resources/user/user.service';
import Controller from '@/utils/interfaces/controller.interface';
import catchAsync from "@/utils/errors/catch-async";
import AppError from '@/utils/errors/app.error';
import validate from '@/resources/user/user.validation';
import selectFieldsMiddleware from '@/middleware/requests/select-fields.middleware';
import RolesEnum from '@/utils/enums/roles.enum';


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
                authenticate,
                this.getCurrentUser
            )
            .delete(
                authenticate,
                this.deactivateCurrentUser
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

        this.router
            .route('/:id')
            .get(
                authenticate, // Use this before restrictTo in order to work
                restrictTo(RolesEnum.ADMIN),
                selectFieldsMiddleware,
                this.getUser
            )
    }

    private register = catchAsync(async (
        req: Request,
        res: Response
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
        res: Response
    ): Promise<Response | void> => {
        const { email, password } = req.body;

        const token = await this.userService.login(email, password);

        res.status(200).json({ 
            status: 'success',
            data: token 
        });
    })

    private getCurrentUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        let { user } = req;
        if (!user) throw new AppError(404, 'No user logged in');

        res.status(200).send({ 
            status: 'success',
            data: req.user 
        });
    })

    private deactivateCurrentUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const { user } = req;

        if (!user) throw new AppError(404, 'No user logged in');
        await this.userService.deactivateUser(user.id);

        res.status(204).send({
            status: 'success',
            data: null
        });
    })

    private getUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const id = req.params.id;
        const fields = req.fields;
        console.log(id, fields, req.user.roles)
        const user = await this.userService.getUser(id, fields);

        res.status(200).send({
            status: 'success',
            data: user
        });
    })

    private deleteUser = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

    })
}


export default UserController;
