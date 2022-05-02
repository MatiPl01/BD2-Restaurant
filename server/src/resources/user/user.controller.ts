import { Router, Request, Response } from 'express';
import selectFieldsMiddleware from '@/middleware/requests/select-fields.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import updateMiddleware from '@/middleware/requests/update.middleware';
import authenticate from '@/middleware/auth/authentication.middleware';
import UserService from '@/resources/user/user.service';
import restrictTo from '@/middleware/auth/authorization.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import catchAsync from "@/utils/errors/catch-async";
import RoleEnum from '@/utils/enums/role.enum';
import AppError from '@/utils/errors/app.error';
import validate from '@/resources/user/user.validation';
import response from '@/utils/response';


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
            .route('/forgot-password')
            .post(
                validationMiddleware(validate.forgotPassword),
                this.forgotPassword
            );

        this.router
            .route('/reset-password/:token')
            .patch(
                validationMiddleware(validate.resetPassword),
                this.resetPassword
            );

        this.router
            .route('/update-password')
            .patch(
                authenticate,
                validationMiddleware(validate.updatePassword),
                this.updatePassword
            );

        this.router
            .route('/update')
            .patch(
                authenticate,
                validationMiddleware(validate.updateUser),
                updateMiddleware,
                this.updateCurrentUser
            )

        this.router
            .route('/:id')
            .get(
                authenticate, // Use this before restrictTo to make it work
                restrictTo(RoleEnum.ADMIN),
                selectFieldsMiddleware,
                this.getUser
            )
            .delete(
                authenticate,
                restrictTo(RoleEnum.ADMIN),
                this.deleteUser
            );
    }

    private register = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { 
            firstName, 
            lastName, 
            login, 
            email, 
            password, 
            addresses, 
            defaultCurrency } = req.body;

        const token = await this.userService.register(
            firstName,
            lastName,
            login,
            email,
            password,
            addresses,
            ['user'],
            defaultCurrency || 'PLN'
        );

        this.sendToken(res, token);
    })

    private login = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { email, password } = req.body;

        const token = await this.userService.login(email, password);

        this.sendToken(res, token);
    })

    private getCurrentUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        let { user } = req;
        if (!user) throw new AppError(404, 'No user logged in');

        response.json(res, 200, req.user);
    })

    private deactivateCurrentUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { user } = req;

        if (!user) throw new AppError(404, 'No user logged in');
        await this.userService.deactivateUser(user.id);

        response.json(res, 204, null);
    })

    private getUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
        const fields = req.fields;
        console.log(id, fields, req.user.roles)
        const user = await this.userService.getUser(id, fields);

        response.json(res, 200, user);
    })

    private deleteUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
        await this.userService.deleteUser(id);
        
        response.json(res, 204, null);
    })

    private forgotPassword = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { email } = req.body;
        const url = `${req.protocol}://${req.get('host')}/api/${process.env.API_VERSION}/${this.PATH}/reset-password`
        await this.userService.forgotPassword(url, email);

        response.json(res, 200, 'Token has been sent to the specified email!');
    })

    private resetPassword = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const resetToken = req.params.token;
        const { newPassword } = req.body;
        
        const token = await this.userService.resetPassword(resetToken, newPassword);

        this.sendToken(res, token);
    })

    private updatePassword = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { user } = req;
        const { currPassword, newPassword } = req.body;

        if (!user) throw new AppError(404, 'No user logged in');
        const token = await this.userService.updatePassword(user.id, currPassword, newPassword);

        this.sendToken(res, token);
    })

    private updateCurrentUser = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;

        if (!user) throw new AppError(404, 'No user logged in');
        const updatedUser = await this.userService.updateUser(user.id, req.body);
        
        response.json(res, 201, updatedUser);
    })

    private sendToken = async (
        res: Response,
        token: string
    ): Promise<void> => {
        const { JWT_COOKIE_EXPIRES_IN, NODE_ENV } = process.env;

        response.cookie(res, 'jwt', token, {
            expires: new Date(
                Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
            ),
            secure: NODE_ENV === 'production', // Make cookie secure only in production
            httpOnly: true
        });

        response.json(res, 200, token); // TODO - this probably should not send token
    }
}


export default UserController;
