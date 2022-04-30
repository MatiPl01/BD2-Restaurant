import Controller from "@/utils/interfaces/controller.interface";
import { Request, Router } from "express";
import catchAsync from "@/utils/exceptions/catchAsync";
import ReviewService from "./review.service";


class OrderController implements Controller {
    public readonly PATH = 'reviews';
    public readonly router = Router();
    private readonly reviewService = new ReviewService();

    constructor() {

    }

    private initializeRoutes(): void {

    }
}

export default OrderController;
