import { model, Schema } from 'mongoose';

import ExchangeRate from './exchange-rate.interface';

// TODO - maybe export repeated validation objects from models and import in other models
const exchangeRateSchema = new Schema(
    {
        rate: {
            type: Number,
            min: [0, 'Exchange rate cannot be lower than 0'],
            required: [true, 'Exchange rate is required'],
        },

        from: { // e.g. USD
            type: String,
            required: [true, 'Please provide currency code'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        },

        to: { // e.g. USD
            type: String,
            required: [true, 'Please provide currency code'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


exchangeRateSchema.index({ createdAt: -1 });
// (This index also ensures that there will be no more repetitions of the same (from, to) pairs)
exchangeRateSchema.index({ from: 1, to: 1 });


export default model<ExchangeRate>('ExchangeRate', exchangeRateSchema);
