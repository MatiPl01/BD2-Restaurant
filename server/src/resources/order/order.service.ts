import { Schema, ClientSession } from 'mongoose';

import singleTransaction from '@/utils/single-transaction';
import { asyncFilter } from '@/utils/filters';
import AppError from '@/utils/errors/app.error';
import currency from '@/utils/currency';

import exchangeRateService from '@/resources/exchange-rate/exchange-rate.service';
import OrderModel from './order.model';
import Order from './order.interface';


class OrderService {
    private order = OrderModel;

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
    ): Promise<Partial<Order>[]> => {
        // Because $where, $aggregate and $function are not available in the
        // free MongoDB Atlas tier, we have to use the inefficient way to
        // filter data (find all orders and then filter them in js)
        const totalPriceFilters = filters.totalPrice;
        delete filters.totalPrice;

        // If order ale filtered by the totalPrice
        if (targetCurrency && totalPriceFilters) {
            let orders: Order[] = await this.order.find({ user: userID, ...filters });
            orders = await this.filterByTotalPrice(orders, targetCurrency, totalPriceFilters, session);
            orders = this.paginate(orders, pagination);
            let mappedOrders: Partial<Order>[] = this.limitFields(orders, fields);
            await this.updateOrdersCurrency(mappedOrders, targetCurrency, session);
            return mappedOrders;
        // If the totalPrice filter was specified without the desired currency
        // - throw an exception because we don't know to which currency we should convert prices
        } else if (totalPriceFilters) {
            throw new AppError(400, 'Price filtering is not allowed without specified currency');
        // It the desired currency was specified without the totalPrice filter 
        // - only convert the price in the results
        } else {
            const orders = await this.order.find(
                { user: userID, ...filters },
                fields,
                { ...pagination, session }
            );

            if (targetCurrency) {
                await this.updateOrdersCurrency(orders, targetCurrency, session);
            }

            return orders;
        }
    })

    private async updateOrderCurrency(
        order: Partial<Order>, 
        targetCurrency: string, 
        session?: ClientSession
    ): Promise<void> {
        if (order.currency === targetCurrency || !order.currency) return;

        const rate = (await exchangeRateService.getExchangeRate(
            order.currency,
            targetCurrency,
            order.createdAt,
            session
        )).rate;

        if (order.totalPrice) {
            // Check if order totalPrice hasn't been filtered out
            order.totalPrice = exchangeRateService.ceilDecimalDigits(order.totalPrice * rate);
        }
        
        // Check if order items haven't been filtered out
        if (order.items) {
            for (const orderItem of order.items) {
                // Check if order item unit price hasn't been filtered out
                if (orderItem.unitPrice) {
                    orderItem.unitPrice = exchangeRateService.ceilDecimalDigits(orderItem.unitPrice * rate);
                }
            }
        }

        if (order.currency) {
            order.currency = targetCurrency;
        }
    }

    private async updateOrdersCurrency(
        orders: Partial<Order>[],
        targetCurrency: string,
        session?: ClientSession
    ): Promise<void> {
        for (const order of orders) {
            await this.updateOrderCurrency(order, targetCurrency, session);
        }
    }

    private async filterByTotalPrice(
        orders: Order[],
        targetCurrency: string,
        totalPriceFilters: { [key: string]: number },
        session?: ClientSession
    ): Promise<Order[]> {
        return await asyncFilter<Order>(
            orders,
            async (order: Order) => {
                const exchangedTotalPrice = await currency.exchangeCurrency(
                    order.totalPrice,
                    order.currency,
                    targetCurrency,
                    order.createdAt,
                    session
                );

                return Object.entries(totalPriceFilters).every(([key, value]) => {
                    switch (key) {
                        case '$gt':
                            return exchangedTotalPrice > value;
                        case '$lt':
                            return exchangedTotalPrice < value;
                        case '$gte':
                            return exchangedTotalPrice >= value;
                        case '$lte':
                            return exchangedTotalPrice <= value;
                        case '$eq':
                            return exchangedTotalPrice === value;
                        case '$ne':
                            return exchangedTotalPrice !== value;
                        default:
                            throw new AppError(400, `Wrong filtering criteria. ${key} is not valid.`);
                    }
                })
            }
        );
    }

    private paginate(
        orders: Order[],
        pagination: { skip: number, limit: number },
    ): Order[] {
        const { skip, limit } = pagination;
        return orders.slice(skip, skip + limit);
    }

    private limitFields(
        orders: Order[],
        fields: { [key: string]: number }
    ): Partial<Order>[] {
        let includeFields: boolean | null = null;
        
        // Check if all fields are of include or exclude type 
        // (if there are not include and exclude type fields mixed)
        Object.values(fields).forEach(isIncluded => {
            if ((includeFields && !isIncluded) || (includeFields === false && isIncluded)) {
                throw new AppError(400, 'Wrong fields were selected. Cannot mix included with excluded fields');
            }
            includeFields = !!isIncluded;
        });
        
        const mappedOrders: Partial<Order>[] = [];

        if (includeFields) {
            orders.forEach(order => {
                const mappedOrder: Partial<Order> = {};
                Object.keys(fields).forEach(field => {
                    mappedOrder[field as keyof Order] = order[field as keyof Order];
                });
                mappedOrders.push(mappedOrder);
            });
        } else {
            orders.forEach(order => {
                const mappedOrder: Partial<Order> = {};
                // TODO - maybe think of some better way than this
                // @ts-ignore
                Object.keys(order._doc).forEach(field => {
                    if (fields[field] !== 0) {
                        mappedOrder[field as keyof Order] = order[field as keyof Order];
                    }
                });
                mappedOrders.push(mappedOrder);
            });
        }

        return mappedOrders;
    }
}


// Create and export order service singleton instance
export default new OrderService();
