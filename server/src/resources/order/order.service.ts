import Order from '@/resources/order/order.interface';
import orderModel from './order.model';
import {Schema} from 'mongoose';


class OrderService {
    private orders = orderModel;

    public async createOrder(
        userID: Schema.Types.ObjectId,
        orderData: Order
    ): Promise<Order> {
        const {
            items,
            currency,
            totalPrice
        } = orderData;

        return await this.orders.create({
            user: userID,
            items,
            currency,
            totalPrice
        });
    };

    public async getOrders(
        userID: Schema.Types.ObjectId,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Order[]> {
        return this.orders.find({user: userID, ...filters}, fields, pagination);
    }
}

export default OrderService;
