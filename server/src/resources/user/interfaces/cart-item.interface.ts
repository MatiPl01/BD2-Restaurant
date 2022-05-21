import { Schema } from 'mongoose';


export default interface CartItem {
    dish: Schema.Types.ObjectId;
    quantity: number;
    stock?: number
};
