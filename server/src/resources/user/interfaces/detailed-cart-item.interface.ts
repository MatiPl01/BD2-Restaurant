import { Schema } from 'mongoose';

import { ImageEntry } from '@/resources/dish/types/image-entry.type';


export default interface DetailedCartItem {
    dishId: Schema.Types.ObjectId;
    dishName: string;
    category: string;
    cuisine: string;
    type: string;
    unitPrice: number;
    quantity: number;
    currency: string;
    stock: number;
    coverImage: ImageEntry;
}
