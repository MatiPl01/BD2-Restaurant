import Controller from "@/utils/interfaces/controller.interface";
import { Request, Response, Router } from "express";
import catchAsync from "@/utils/exceptions/catchAsync";
import DishService from "@/resources/dish/dish.service"
import validationMiddleware from "@/middleware/validation.middleware";
import filteringMiddleware from "@/middleware/filtering.middleware";
import selectFieldsMiddleware from "@/middleware/selectFields.middleware";
import validation from "@/resources/dish/dish.validation";
import Dish from "./dish.interface";
import updateMiddleware from "@/middleware/update.middleware";
import HttpException from "@/utils/exceptions/http.exception";


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
            .get(
                filteringMiddleware,
                selectFieldsMiddleware,
                this.getDishes
            )
            .post(
                validationMiddleware(validation.createDish),
                this.createDish
            );

        this.router
            .route('/:id')
            .get(
                selectFieldsMiddleware,
                this.getDish
            )
            .patch(
                validationMiddleware(validation.updateDish),
                updateMiddleware,
                this.updateDish
            )
            .delete(this.deleteDish);
    }

    private getDishes = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const { filters, fields } = req;
        const { page, limit } = req.query;
        const pageNum = +(page || 0) || 1;
        const limitNum = +(limit || 0) || 30;

        const pagination = {
            skip: (pageNum - 1) * limitNum,
            limit: limitNum
        }

        const dishes = await this.dishService.getDishes(filters, fields, pagination);
        if (!dishes.length) throw new HttpException(404, "This page does not exist");

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

    private getDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const id = req.params.id;
        const fields = req.fields;
        const dish = await this.dishService.getDish(id, fields);

        res.status(200).send({ data: dish });
    })

    private updateDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const id = req.params.id;
        const updatedDish = await this.dishService.updateDish(id, req.body);

        res.status(201).send({ data: updatedDish });
    })

    private deleteDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const id = req.params.id;
        await this.dishService.deleteDish(id);

        res.status(204).json({ data: null });
    })
}

export default DishController;
