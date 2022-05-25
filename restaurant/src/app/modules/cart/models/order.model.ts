import { Order } from "@cart/interfaces/order.interface";
import { OrderItem } from "@cart/types/order-item.type";

export default class OrderModel implements Order {
  public readonly _id: string;
  public readonly user: string; // id
  public readonly items: OrderItem[];
  public readonly currency: string;
  public readonly totalPrice: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(order: Order) {
    this._id = order._id;
    this.user = order.user;
    this.items = order.items;
    this.currency = order.currency;
    this.totalPrice = order.totalPrice;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}
