import Controller from "@/utils/interfaces/controller.interface";
import { Request, Response, Router } from "express";
import catchAsync from "@/utils/exceptions/catchAsync";
import DishService from "@/resources/dish/dish.service"
import validationMiddleware from "@/middleware/validation.middleware";
import validation from "@/resources/dish/dish.validation";
import Dish from "./dish.interface";


class DishController implements Controller {
    public readonly PATH = 'dishes';
    public readonly router = Router();
    private readonly dishService = new DishService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route('/')
            .get(this.getAllDishes)
            .post(
                validationMiddleware(validation.createDish),
                this.createDish
            );
    }

    private getAllDishes = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const dishes = await this.dishService.getAllDishes();

        res.status(200).send({ data: dishes });
    })

    private createDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const dishData: Dish = req.body;
        const dish = await this.dishService.createDish(dishData);

        res.status(201).send({ data: dish });
    })
}

export default DishController;
