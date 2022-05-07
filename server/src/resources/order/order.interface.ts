import {Document} from 'mongoose';


export default interface Order extends Document {
    user: string,
    items: {
        dish: string,
        quantity: number,
        unitPrice: number
    }[],
    date: Date,
    totalPrice: number,
    currency: string,
    createdAt: number;
}
