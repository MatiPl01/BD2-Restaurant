import Review from '@/resources/review/review.interface';
import {model, Schema} from 'mongoose';


const reviewSchema = new Schema(
    {
        user: {
            type: String,
            ref: 'User',
            required: [true, 'Please provide user login'],
        },

        dish: {
            type: String,
            ref: 'Dish',
            required: [true, 'Please provide dish name']
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

reviewSchema.pre<Review>(/^find/, function (next) {
    this.populate([
        {
            path: 'user',
            select: 'firstName lastName'
        },
        {
            path: 'dish',
            select: 'name'
        }
    ]);

    next();
});

export default model<Review>('Review', reviewSchema);
