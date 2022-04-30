import { Schema, model } from 'mongoose';
import Order from '@/resources/order/order.interface';

const orderSchema = new Schema(

);

export default model<Order>('Order', orderSchema);
