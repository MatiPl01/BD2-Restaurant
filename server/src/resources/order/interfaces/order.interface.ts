import { Document, Schema } from 'mongoose';


export default interface OrderData extends Document {
    _id: Schema.Types.ObjectId;
    user: string;
    items: {
        dish: string,
        dishName: string,
        quantity: number,
        unitPrice: number
    }[];
    totalPrice: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}
