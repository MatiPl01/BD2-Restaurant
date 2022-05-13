import { model, Schema } from 'mongoose';
import ExchangeRate from "@/resources/exchange-rate/exchange-rate.interface";

// TODO - maybe export repeated validation objects from models an import in other models
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
            unique: [true, 'Currency code must be unique'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        },

        to: { // e.g. USD
            type: String,
            required: [true, 'Please provide currency code'],
            unique: [true, 'Currency code must be unique'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Add indexes on the specific fields of the documents
// (This index also ensures that there will be no more repetitions of the same (from, to) pairs)
exchangeRateSchema.index({ from: 1, to: 1 }, { unique: true });


export default model<ExchangeRate>('ExchangeRate', exchangeRateSchema);
