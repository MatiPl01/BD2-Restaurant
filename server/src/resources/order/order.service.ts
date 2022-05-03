import Order from '@/resources/order/order.interface';
import orderModel from './order.model';


class OrderService {
    private orders = orderModel;

    public async createOrder(
        orderData: Order,
        userId: string
    ): Promise<Order> {
        const {
            items,
            currency,
            totalPrice
        } = orderData;

        return await this.orders.create({
            user: userId,
            items,
            currency,
            totalPrice
        });
    };

    public async getOrders(
        userId: string,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Order[]> {
        return await this.orders.find({ user: userId, ...filters }, fields, pagination);
    }
}

export default OrderService;
