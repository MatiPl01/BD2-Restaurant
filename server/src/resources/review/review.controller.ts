import { Request, Router } from "express";
import ReviewService from "./review.service";
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";


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
