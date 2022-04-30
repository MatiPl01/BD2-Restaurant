import { Document } from 'mongoose';
import mongoose from 'mongoose';

export default interface Dish extends Document {
    name: string,
    category: string,
    cuisine: string,
    type: string,
    ingredients: string[],
    stock: number,
    currency: string,
    unitPrice: number,
    ratingsSum: number,
    ratingsCount: number,
    description: string[],
    images: {
        coverIdx: number,
        gallery: {
            breakpoints: number[],
            paths: string[]
        }[]
    },
    reviews: mongoose.Schema.Types.ObjectId[]
}
