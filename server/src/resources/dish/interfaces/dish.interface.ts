import { Document, Schema, ClientSession } from 'mongoose';
import { ImageEntry } from '../types/image-entry.type';


export default interface Dish extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    category: string;
    cuisine: string;
    type: string;
    ingredients: string[];
    stock: number;
    currency: string;
    unitPrice: number;
    mainUnitPrice: number;
    ratingsAverage: number;
    ratingsCount: number;
    description: string[];
    coverIdx?: number;
    coverImage: ImageEntry;
    images: ImageEntry[];
    reviews: Schema.Types.ObjectId[]

    updateMainUnitPrice(targetCurrency?: string, session?: ClientSession): void;
}
