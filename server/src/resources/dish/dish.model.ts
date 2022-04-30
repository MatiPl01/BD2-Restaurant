import { Schema, model } from 'mongoose';
import Dish from '@/resources/dish/dish.interface';
import mongoose from 'mongoose';

const DishSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a dish name'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Please provide a dish category']
        },
        cuisine: {
            type: String,
            default: 'międzynarodowa'
        },
        type: {
            type: String,
            default: 'pozostałe'
        },
        ingredients: {
            type: [String],
            required: [true, 'Please provide dish ingredients']
        },
        stock: {
            type: Number,
            required: [true, 'Please provide a dish stock']
        },
        currency: {
            type: String,
            required: [true, 'Please provide a dish price currency']
        },
        unitPrice: {
            type: Number,
            required: [true, 'Please provide a dish unit price']
        },
        ratingsSum: {
            type: Number,
            default: 0,
            min: [0, 'Sum of dish ratings cannot be lower than 0']
        },
        ratingsCount: {
            type: Number,
            default: 0,
            min: [0, 'Number of dish reviews cannot be lower than 0']
        },
        description: {
            type: [String],
            required: [true, 'Please provide a dish description']
        },
        images: {
            coverIdx: {
                type: Number,
                default: 0,
                min: [0, 'Cover index cannot be lower than 0']
            },
            gallery: [{
                breakpoints: {
                    type: [Number],
                    required: [true, 'Please provide dish images breakpoints']
                },
                paths: {
                    type: [String],
                    required: [true, 'Please provide dish images paths']
                }
            }]
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    }
);

export default model<Dish>('Dish', DishSchema);
