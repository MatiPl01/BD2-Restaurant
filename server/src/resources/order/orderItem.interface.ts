import {Document, Schema} from 'mongoose';

export default interface OrderItem extends Document{
    dish:Schema.Types.ObjectId,
    dishName:string,
    quantity:number,
    unitPrice:number,
}