import { Document, Schema } from 'mongoose';


export default interface Order extends Document {
    user: Schema.Types.ObjectId,
    dishes: { 
        dish: Schema.Types.ObjectId,
        quantity: number,
        unitPrice: number
    }[],
    date: Date,
    totalPrice: number,
    currency: string
}
