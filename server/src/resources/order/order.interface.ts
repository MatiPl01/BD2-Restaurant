import {Document, Schema} from 'mongoose';
import OrderItem from "@/resources/order/orderItem.interface";


export default interface Order extends Document {
    user:Schema.Types.ObjectId,
    dishes:OrderItem[],
    totalPrice:number,
    currency:string,
}
