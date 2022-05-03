import Order from '@/resources/order/order.interface';
import orderModel from './order.model';
import AppError from "@/utils/errors/app.error";


class OrderService {
    private orders = orderModel;

    public async createOrder(
        orderData:Order,userId:string
    ): Promise<Order|Error> {
        return await this.orders.create({user:userId,dishes:orderData.dishes,currency:orderData.currency,totalPrice:orderData.totalPrice});
    };

    public async getOrders(
        userId:string
    ):Promise<Order[]> {
        const result = await this.orders.find({userId: userId });
        if (result) return result;

        throw new AppError(404, `Cannot find Order for user ${userId}`);
    }
}

export default OrderService;
