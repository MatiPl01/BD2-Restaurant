import {Request, Response, Router} from "express";
import ReviewService from "./review.service";
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";
import response from "@/utils/response";
import updateMiddleware from "@/middleware/requests/update.middleware";
import AppError from "@/utils/errors/app.error";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/review/review.validation";

class OrderController implements Controller {
    public readonly PATH = 'reviews';
    public readonly router = Router();
    private readonly reviewService = new ReviewService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route('/')
            .delete(
                this.deleteReview
            )
            .post(
                validationMiddleware(validate.createReview),
                updateMiddleware,
                this.createReview
            )
            .patch(
                validationMiddleware(validate.editReview),
                this.editReview
            )
            .get(
                this.getReviews
            )
    }

    private createReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const user = req.user;

        if (!user) throw new AppError(404, 'No user logged in');
        const {dish,rating,body}=req.body;

        const result = await this.reviewService.createReview(user.id,dish,rating,body);
        response.json(res, 200, result);
    })

    private deleteReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const id = req.query.id as string;
        const result = await this.reviewService.deleteReview(id);
        response.json(res, 200, result);
    })

    private editReview = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const {review,rating,body}=req.body;
        const result = await this.reviewService.editReview(review,body,rating);
        response.json(res, 200, result);
    })

    private getReviews = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const dishId=req.query.id as string;
        const result = await this.reviewService.getReviews(dishId);
        response.json(res, 200, result);
    })
}


export default OrderController;
