import { model, Schema } from 'mongoose';

import AppError from '@/utils/errors/app.error';

import DishModel from '@/resources/dish/dish.model';
import Review from './interfaces/review.interface';


const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user id'],
        },

        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
            required: [true, 'Please provide dish id']
        },

        dishName: {
            type: String,
            trim: [true, 'Dish name should have no spaces at the beginning and at the end'],
            minlength: [2, 'Dish name should contain at least 2 characters'],
            maxlength: [40, 'Dish name shouldn\'t be longer than 40 characters'],
            required: [true, 'Dish Name is required'],
        },

        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: [true, 'Please provide order id']
        },

        rating: {
            type: Number,
            min: [0, 'Rating cannot be lower than 0'],
            max: [5, 'Rating cannot be greater than 5'],
            validate: {
                validator: (value: number) => Math.floor(value * 2) === value * 2,
                message: 'Rating must be a multiple of 0.5'
            },
            required: [true, 'Please provide your rating']
        },

        body: {
            type: [String],
            default: []
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
);

// Add indexes on the specific fields of the documents
reviewSchema.index({ user: 1, dish: 1, rating: 1 });

reviewSchema.pre<Review>('validate', async function (
    next
): Promise<void> {
    const dishID = this.dish;
    const dish = await DishModel.findById(dishID);
    if (!dish) return next(new AppError(404, `Cannot find dish with id ${dishID}`))

    this.dishName = dish.name;
    next();
});

reviewSchema.pre<Review>(/^find/, function (next) {
    this.populate([
        {
            path: 'user',
            select: 'firstName lastName'
        },
        {
            path: 'dish',
            select: 'coverImage'
        }
    ]);

    next();
});


export default model<Review>('Review', reviewSchema);
