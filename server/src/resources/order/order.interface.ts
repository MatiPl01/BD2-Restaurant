import { Document } from 'mongoose';


export default interface OrderData extends Document {
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
