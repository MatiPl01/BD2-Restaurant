import {Document, Schema} from 'mongoose';


export default interface Review extends Document {
    // Custom properties
    user: string;
    dish: string;
    order: Schema.Types.ObjectId;
    rating: number,
    body: string[],

    // Mongoose properties
    createdAt: Date,
    updatedAt: Date
}
