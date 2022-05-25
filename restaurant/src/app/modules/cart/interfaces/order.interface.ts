import { OrderItem } from "../types/order-item.type";

export interface Order {
  _id: string,
  user: string, // id
  items: OrderItem[],
  currency: string,
  totalPrice: number,
  createdAt: Date,
  updatedAt: Date
}
