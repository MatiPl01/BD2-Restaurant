import { Request, Router } from "express";
import OrderService from "./order.service";
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";


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
