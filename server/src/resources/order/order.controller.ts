import Controller from "@/utils/interfaces/controller.interface";
import { Request, Router } from "express";
import catchAsync from "@/utils/exceptions/catchAsync";
import OrderService from "./order.service";


class OrderController implements Controller {
    public readonly PATH = 'orders';
    public readonly router = Router();
    private readonly orderService = new OrderService();

    constructor() {

    }

    private initializeRoutes(): void {
        
    }
}

export default OrderController;
