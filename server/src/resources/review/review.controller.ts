import { Request, Response, Router } from "express";
import validationMiddleware from "@/middleware/validation.middleware";
import updateMiddleware from "@/middleware/requests/update.middleware";
import ReviewService from "./review.service";
import authenticate from '@/middleware/auth/authentication.middleware';
import restrictTo from '@/middleware/auth/authorization.middleware';
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";
import response from "@/utils/response";
import AppError from "@/utils/errors/app.error";
import validate from "@/resources/review/review.validation";
import RoleEnum from "@/utils/enums/role.enum";


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
            .delete(
                authenticate,
                restrictTo(RoleEnum.USER),
                this.deleteReview
            )
            .post(
                authenticate,
                restrictTo(RoleEnum.USER),
                validationMiddleware(validate.createReview),
                this.createReview
            );
            
        this.router
            .route('/:id')
            .get(
                this.getReview
            )
            .patch(
                authenticate,
                restrictTo(RoleEnum.USER),
                validationMiddleware(validate.editReview),
                updateMiddleware,
                this.editReview
            );
    }

    private createReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const user = req.user;

        if (!user) throw new AppError(404, 'No user logged in');
        const { dish, rating, body } = req.body;

        const review = await this.reviewService.createReview(user.id, dish, rating, body);
        response.json(res, 200, review);
    })

    private deleteReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.query.id as string;
        const review = await this.reviewService.deleteReview(id);
        response.json(res, 200, review);
    })

    private editReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
        const review = await this.reviewService.editReview(id, req.body);

        response.json(res, 200, review);
    })

    private getReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
        const review = await this.reviewService.getReview(id);

        response.json(res, 200, review);
    })

    // private getReviews = catchAsync(async (
    //     req: Request,
    //     res: Response
    // ): Promise<void> => {
    //     const dishId=req.query.id as string;
    //     const result = await this.reviewService.getReviews(dishId);
    //     response.json(res, 200, result);
    // })
}


export default ReviewController;
