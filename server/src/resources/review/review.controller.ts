import {Request, Response, Router} from "express";
import selectFieldsMiddleware from "@/middleware/requests/select-fields.middleware";
import validationMiddleware from "@/middleware/validation.middleware";
import filteringMiddleware from "@/middleware/requests/filtering.middleware";
import updateMiddleware from "@/middleware/requests/update.middleware";
import ReviewService from "./review.service";
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";
import response from "@/utils/response";
import validate from "@/resources/review/review.validation";
import RoleEnum from "@/utils/enums/role.enum";
import AppError from "@/utils/errors/app.error";


class ReviewController implements Controller {
    public readonly PATH = 'reviews';
    public readonly router = Router();
    private readonly reviewService = new ReviewService();

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
                validationMiddleware(validate.bodyCreateReview, null, null),
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
                validationMiddleware(validate.bodyEditReview, null, null),
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
        const {filters, fields} = req;
        const {page, limit} = req.query;
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
        const {dish, rating, body} = req.body;
        const review = await this.reviewService.createReview(user.login, dish, rating, body);
        await response.json(res, 200, review);
    })

    private deleteReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        if (!user) throw new AppError(400, 'No user logged in');
        const id = req.params.id as string;
        const review = await this.reviewService.deleteReview(id, user.login);
        await response.json(res, 200, review);
    })

    private editReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;
        if (!user) throw new AppError(400, 'No user logged in');
        const id = req.params.id;
        const review = await this.reviewService.editReview(id, req.body, user.login);

        await response.json(res, 200, review);
    })

    private getReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
        const {fields} = req;
        const review = await this.reviewService.getReview(id, fields);

        await response.json(res, 200, review);
    })
}


export default ReviewController;
