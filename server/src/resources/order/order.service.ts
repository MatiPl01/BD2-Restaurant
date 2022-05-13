import { Schema, ClientSession } from 'mongoose';
import { updatePriceFilters } from '@/utils/filters';
import singleTransaction from '@/utils/single-transaction';
import orderModel from './order.model';
import currency from '@/utils/currency';
import AppError from '@/utils/errors/app.error';
import Order from '@/resources/order/order.interface';


class OrderService {
    private order = orderModel;

    public async createOrder(
        userID: Schema.Types.ObjectId,
        orderData: Order
    ): Promise<Order> {
        const {
            items,
            currency
        } = orderData;

        return await this.order.create({
            user: userID,
            items,
            currency
        });
    };

    public getUserOrders = singleTransaction(async (
        session: ClientSession,
        userID: Schema.Types.ObjectId,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number },
        targetCurrency?: string
    ): Promise<Order[]> => {
        filters = await updatePriceFilters(filters, targetCurrency, session);

        const orders = await this.order.find(
            { user: userID, ...filters },
            fields,
            pagination
        );

        if (targetCurrency) {
            for (const order of orders) {
                if (!order.currency) {
                    throw new AppError(400, `Cannot convert order price to ${targetCurrency} when currency field isn't selected`);
                }

                if (order.items) {
                    for (const orderItem of order.items) {
                        // If an order item has no unit price, we can break the loop
                        // because the user chose not to display the unitPrice
                        if (orderItem.unitPrice === undefined) break;

                        orderItem.unitPrice = await currency.exchangeCurrency(
                            orderItem.unitPrice,
                            order.currency,
                            targetCurrency,
                            new Date(order.createdAt),
                            session
                        );
                    }
                }

                if (order.totalPrice) {
                    order.totalPrice = await currency.exchangeCurrency(
                        order.totalPrice,
                        order.currency,
                        targetCurrency,
                        new Date(order.createdAt),
                        session
                    );
                }

                if (order.currency) order.currency = targetCurrency;
            }
        }

        return orders;
    })
}

export default OrderService;
