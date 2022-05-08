import {Document, Schema} from 'mongoose';


export default interface Review extends Document {
    // Custom properties
    user: Schema.Types.ObjectId;
    dish: Schema.Types.ObjectId;
    order: Schema.Types.ObjectId;
    dishName: string;
    rating: number,
    body: string[],

    // Mongoose properties
    createdAt: Date,
    updatedAt: Date
}
