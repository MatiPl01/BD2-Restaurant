import { Request, Response, Router } from "express";
import selectFieldsMiddleware from "@/middleware/requests/select-fields.middleware";
import validationMiddleware from "@/middleware/validation.middleware";
import filteringMiddleware from "@/middleware/requests/filtering.middleware";
import updateMiddleware from "@/middleware/requests/update.middleware";
import authenticate from '@/middleware/auth/authentication.middleware';
import DishService from "@/resources/dish/dish.service"
import restrictTo from '@/middleware/auth/authorization.middleware';
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";
import validation from "@/resources/dish/dish.validation";
import response from "@/utils/response";
import RoleEnum from "@/utils/enums/role.enum";
import { Schema } from 'mongoose';
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
            .get(
                filteringMiddleware,
                selectFieldsMiddleware,
                this.getDishes
            )
            .post(
                authenticate,
                restrictTo(RoleEnum.MANAGER),
                validationMiddleware(validation.body.createDish),
                this.createDish
            );

        this.router
            .route('/:id')
            .get(
                validationMiddleware(undefined, undefined, validation.query.getDish),
                selectFieldsMiddleware,
                this.getDish
            )
            .patch(
                authenticate,
                restrictTo(RoleEnum.MANAGER),
                validationMiddleware(validation.body.updateDish),
                updateMiddleware,
                this.updateDish
            )
            .delete(
                authenticate,
                restrictTo(RoleEnum.MANAGER),
                this.deleteDish
            );

        this.router
            .route('/:id/reviews')
            .get(
                filteringMiddleware,
                selectFieldsMiddleware,
                this.getDishReviews
            );
    }

    private getDishes = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { filters, fields } = req;
        const { page, limit, currency } = req.query;
        const pageNum = +(page || 0) || 1;
        const limitNum = +(limit || 0) || 30;

        const pagination = {
            skip: (pageNum - 1) * limitNum,
            limit: limitNum
        }

        const dishes = await this.dishService.getDishes(
            filters,
            fields,
            pagination,
            currency as string | undefined
        );

        await response.json(res, 200, dishes);
    })

    private createDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const dishData: Dish = req.body;
        const dish = await this.dishService.createDish(dishData);

        await response.json(res, 201, dish);
    })

    private getDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        const fields = req.fields;
        const { currency } = req.query;
        const dish = await this.dishService.getDish(
            id,
            fields,
            currency as string | undefined
        );

        await response.json(res, 200, dish);
    })

    private updateDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        const updatedDish = await this.dishService.updateDish(id, req.body);

        await response.json(res, 201, updatedDish);
    })

    private deleteDish = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        await this.dishService.deleteDish(id);

        await response.json(res, 204, null);
    })

    private getDishReviews = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = (req.params.id as unknown) as Schema.Types.ObjectId;
        const { filters, fields } = req;
        const { page, limit } = req.query;
        const pageNum = +(page || 0) || 1;
        const limitNum = +(limit || 0) || 30;

        const pagination = {
            skip: (pageNum - 1) * limitNum,
            limit: limitNum
        }

        const reviews = await this.dishService.getDishReviews(id, filters, fields, pagination);

        await response.json(res, 200, reviews);
    })
}


export default DishController;
