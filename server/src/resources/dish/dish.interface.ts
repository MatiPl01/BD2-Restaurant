import { Document, Schema, ClientSession } from 'mongoose';


type ImageEntry = {
    breakpoints: number[],
    paths: string[]
};

export default interface Dish extends Document {
    name: string;
    category: string;
    cuisine: string;
    type: string;
    ingredients: string[];
    stock: number;
    currency: string;
    unitPrice: number;
    mainUnitPrice: number;
    ratingsSum: number;
    ratingsCount: number;
    description: string[];
    coverIdx?: number;
    coverImage: ImageEntry;
    images: ImageEntry[];
    reviews: Schema.Types.ObjectId[]

    updateMainUnitPrice(targetCurrency?: string, session?: ClientSession): void;
}
