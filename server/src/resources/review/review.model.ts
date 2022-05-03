import Review from '@/resources/review/review.interface';
import { Schema, model } from 'mongoose';


const reviewSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            required: [true, 'UserID is required'],
        },
        dish:{
            type:Schema.Types.ObjectId,
            required: [true, 'DishID is required'],
        },
        order:{
            type:Schema.Types.ObjectId,
            required: [true, 'CurrencyID is required'],
        },
        rating:{
            type:Number,
            required: [true, 'RatingID is required'],
            min: [0, 'Ordered dish quantity must be positive'],
            max: [5, 'Ordered dish quantity must lower than 5'],
            validate: {
                validator: (value: number) => Math.floor(value * 2) === value * 2,
                message: 'Rating must be a multiple of 0.5'
            },
        },
        body:{
            type:String,
            required: [true, 'Body of review is required'],
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


export default model<Review>('Review', reviewSchema);
