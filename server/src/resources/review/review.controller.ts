import { Request, Response, Router } from 'express';
import { Schema } from 'mongoose';

import selectFieldsMiddleware from '@/middleware/requests/select-fields.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import filteringMiddleware from '@/middleware/requests/filtering.middleware';
import updateMiddleware from '@/middleware/requests/update.middleware';
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';

import Controller from '@/utils/interfaces/controller.interface';
import catchAsync from '@/utils/errors/catch-async';
import RoleEnum from '@/utils/enums/role.enum';
import response from '@/utils/response';

import reviewService from './review.service';
import validate from './review.validation';


class ReviewController implements Controller {
    public readonly PATH = 'reviews';
    public readonly router = Router();
    private readonly reviewService = reviewService;

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router
            .route('/')
            .get(
                filteringMiddleware,
                selectFieldsMiddleware,
                this.getReviews
            )
            .post(
                authenticate,
                restrictTo(RoleEnum.USER),
                validationMiddleware(validate.body.createReview),
                this.createReview
            );

        this.router
            .route('/:id')
            .get(
                selectFieldsMiddleware,
                this.getReview
            )
            .patch(
                authenticate,
                restrictTo(RoleEnum.USER),
                validationMiddleware(validate.body.editReview),
                updateMiddleware,
                this.editReview
            )
            .delete(
                authenticate,
                restrictTo(RoleEnum.USER),
                this.deleteReview
            );
    }

    private getReviews = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { filters, fields } = req;
        const { page, limit } = req.query;
        const pageNum = +(page || 0) || 1;
        const limitNum = +(limit || 0) || 30;

        const pagination = {
            skip: (pageNum - 1) * limitNum,
            limit: limitNum
        }

        const dishes = await this.reviewService.getReviews(filters, fields, pagination);

        await response.json(res, 200, dishes);
    })

    private createReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        const { dish: dishID, order: OrderID, rating, body } = req.body;
        const review = await this.reviewService.createReview(user.id, dishID, OrderID, rating, body);
        await response.json(res, 200, review);
    })

    private deleteReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        const review = await this.reviewService.deleteReview(id, user.id);
        await response.json(res, 200, review);
    })

    private editReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        const review = await this.reviewService.editReview(id, user.id, req.body);
        await response.json(res, 200, review);
    })

    private getReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { fields } = req;
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        const review = await this.reviewService.getReview(id, fields);
        await response.json(res, 200, review);
    })
}


// Create and export review controller singleton instance
export default new ReviewController();
