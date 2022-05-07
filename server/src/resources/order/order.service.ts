import Order from '@/resources/order/order.interface';
import orderModel from './order.model';


class OrderService {
    private orders = orderModel;

    public async createOrder(
        orderData: Order,
        userLogin: string
    ): Promise<Order> {
        console.log(userLogin)
        const {
            items,
            currency,
            totalPrice
        } = orderData;

        return await this.orders.create({
            user: userLogin,
            items,
            currency,
            totalPrice
        });
    };

    public async getOrders(
        userLogin: string,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Order[]> {
        return this.orders.find({user: userLogin, ...filters}, fields, pagination);
    }
}

export default OrderService;
