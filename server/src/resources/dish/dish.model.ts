import { model, Schema, ClientSession } from 'mongoose';

import AppError from '@/utils/errors/app.error';

import ExchangeRateModel from '@/resources/exchange-rate/exchange-rate.model';
import ConfigModel from '@/resources/config/config.model';
import Dish from './interfaces/dish.interface';


const imageSchema = new Schema(
    {
        breakpoints: {
            type: [
                {
                    type: Number,
                    min: [0, 'Dish image breakpoint should not be lower than 0'],
                    required: [true, 'Please provide dish image breakpoint']
                }
            ],
            required: [true, 'Please provide dish images breakpoints']
        },
        paths: {
            type: [
                {
                    type: String,
                    trim: [true, 'Dish image path must have no spaces at the beginning ans ath the end'],
                    required: [true, 'Please provide dish image path']
                }
            ],
            required: [true, 'Please provide dish images paths']
        }
    },

    {
        _id: false,
        timestamps: false,
        versionKey: false
    }
)

const dishSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a dish name'],
            trim: [true, 'Dish name should have no spaces at the beginning and at the end'],
            unique: [true, 'Dish name should be unique'],
            minlength: [2, 'Dish name should contain at least 2 characters'],
            maxlength: [40, 'Dish name shouldn\'t be longer than 40 characters']
        },

        category: {
            type: String,
            required: [true, 'Please provide a dish category'],
            trim: [true, 'Dish category should have no spaces at the beginning and at the end'],
            lowercase: [true, 'Dish category should be lowercase'],
            minlength: [2, 'Dish category should contain at least 2 characters'],
            maxlength: [25, 'Dish category should contain at most 25 characters'],
        },

        cuisine: {
            type: String,
            trim: [true, 'Dish cuisine should have no spaces at the beginning and at the end'],
            lowercase: [true, 'Dish cuisine should be lowercase'],
            minlength: [2, 'Dish cuisine should contain at least 2 characters'],
            maxlength: [15, 'Dish cuisine should contain at most 15 characters'],
            default: 'inna'
        },

        type: {
            type: String,
            trim: [true, 'Dish type should have no spaces at the beginning and at the end'],
            lowercase: [true, 'Dish type should be lowercase'],
            minlength: [2, 'Dish type should contain at least 2 characters'],
            maxlength: [15, 'Dish type should contain at most 15 characters'],
            default: 'inne'
        },

        ingredients: {
            type: [{
                type: String,
                minlength: [1, 'Dish ingredient should be not empty string'],
            }],
            required: [true, 'Please provide dish ingredients']
        },

        stock: {
            type: Number,
            min: [0, 'Dish stock should not be lower than 0'],
            validate: {
                validator: Number.isInteger,
                message: 'Dish stock must be an integer number'
            },
            default: 0
        },

        currency: {
            type: String,
            uppercase: [true, 'Currency must be an uppercase 3-letter currency code'],
            length: [3, 'Currency code must have exactly 3 letters'],
            required: [true, 'Please provide a dish price currency']
        },

        unitPrice: {
            type: Number,
            min: [0, 'Dish main price should be not lower than 0'],
            required: [true, 'Please provide a dish unit price']
        },

        mainUnitPrice: {
            type: Number,
            min: [0, 'Dish main unit price should be not lower than 0'],
            required: [true, 'Please provide a dish main unit price'],
            select: false
        },

        ratingsAverage: {
            type: Number,
            default: 0,
            min: [0, 'Dish ratings average should be not lower than 0'],
            max: [5, 'Dish ratings average should be not greater than 5']
        },

        ratingsCount: {
            type: Number,
            default: 0,
            min: [0, 'Number of dish reviews cannot be lower than 0']
        },

        description: {
            type: [String],
            required: [true, 'Please provide dish description']
        },

        coverImage: {
            type: imageSchema,
            required: [true, 'Please provide dish cover image']
        },

        images: {
            type: [imageSchema],
            required: [true, 'Please provide dish cover image'],
            minlength: [1, 'Please provide at least 1 dish image']
        }
    },

    {
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Add indexes on the specific fields of the documents
dishSchema.index({ category: 1, cuisine: 1, ratingsAverage: -1 });

dishSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'dish',
    localField: '_id'
});

dishSchema.pre<Dish>('validate', async function (
    next
): Promise<void> {
    if (this.isModified('currency') || this.isModified('unitPrice')) {
        try {
            await this.updateMainUnitPrice();
        } catch (err) {
            next(err as Error);
        }
    }

    if (!this.coverImage) this.coverImage = this.images[0];

    next();
});

dishSchema.methods.updateMainUnitPrice = async function (
    targetCurrency?: string,
    session?: ClientSession
): Promise<void> {
    const { unitPrice, currency: from } = this;
    let to = targetCurrency;

    if (!to) {
        const config = await ConfigModel.findOne({}, {}, { session });
        if (!config) throw new AppError(404, 'Cannot find config in a database');
        to = config.mainCurrency;
    }

    if (from === to) {
        this.mainUnitPrice = unitPrice;
    } else {
        const exchangeRate = await ExchangeRateModel.findOne({ from, to }, {}, { session });
        if (!exchangeRate) {
            throw new AppError(404, `Cannot find exchange rate from ${from} to ${to}`);
        }
    
        this.mainUnitPrice = Math.ceil(unitPrice * exchangeRate.rate * 10000) / 10000;
    }
};


export default model<Dish>('Dish', dishSchema);
