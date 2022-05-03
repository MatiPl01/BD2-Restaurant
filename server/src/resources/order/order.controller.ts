import {Request, Response, Router} from "express";
import OrderService from "./order.service";
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";
import response from "@/utils/response";
import Order from "@/resources/order/order.interface";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/order/order.validation";
import updateMiddleware from "@/middleware/requests/update.middleware";
import AppError from "@/utils/errors/app.error";


class OrderController implements Controller {
    public readonly PATH = 'orders';
    public readonly router = Router();
    private readonly orderService = new OrderService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route('/')
            .get(
                updateMiddleware,
                this.getOrders
            )
            .post(
                validationMiddleware(validate.createOrder),
                updateMiddleware,
                this.createOrder
            )
    }

    private createOrder = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const user = req.user;
        if (!user) throw new AppError(404, 'No user logged in');
        const orderData:Order=req.body
        const result = await this.orderService.createOrder(orderData,user.id);
        response.json(res, 200, result);
    })

    private getOrders = catchAsync(async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
        const user = req.user;
        if (!user) throw new AppError(404, 'No user logged in');
        const result = await this.orderService.getOrders(user.id);
        response.json(res, 200, result);
    })
}


export default OrderController;
