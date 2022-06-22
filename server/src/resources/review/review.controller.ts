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
import handlerFactory from '../shared/handlerFactory';
import reviewModel from './review.model';


class ReviewController implements Controller {
    public readonly PATH = 'reviews';
    public readonly router = Router();
    private readonly reviewService = reviewService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route('/')
            .get(
                filteringMiddleware,
                selectFieldsMiddleware,
                validationMiddleware(undefined, undefined, validate.query.getReviews),
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
                validationMiddleware(undefined, undefined, validate.query.getReview),
                this.getReview
            )
            .patch(
                authenticate,
                restrictTo(RoleEnum.USER),
                validationMiddleware(validate.body.editReview),
                updateMiddleware,
                this.updateReview
            )
            .delete(
                authenticate,
                restrictTo(RoleEnum.USER),
                this.deleteReview
            );
    }

    private getReviews = handlerFactory.findMany(reviewModel);

    private createReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        const { dish: dishID, order: OrderID, rating, body } = req.body;
        const review = await this.reviewService.createReview(user.id, dishID, OrderID, rating, body);

        await response.json(res, 201, review);
    })

    private deleteReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        await this.reviewService.deleteReview(id, user.id);
        
        await response.json(res, 204, null);
    })

    private updateReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        const review = await this.reviewService.editReview(id, user.id, req.body);
        
        await response.json(res, 201, review);
    })

    private getReview = handlerFactory.findById(reviewModel, true);
}


// Create and export review controller singleton instance
export default new ReviewController();
