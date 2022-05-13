import { model, Schema } from 'mongoose';
import Currency from '@/resources/currency/currency.interface';


const currencySchema = new Schema(
    {
        code: { // e.g. USD
            type: String,
            required: [true, 'Please provide currency code'],
            unique: [true, 'Currency code must be unique'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        },

        symbol: { // e.g. $
            type: String,
            required: [true, 'Currency symbol is required'],
            trim: [true, 'Currency symbol cannot start with and end with spaces'],
            unique: [true, 'Currency symbol must be unique'],
            maxlength: [3, 'Currency symbol must contain at most 3 signs'],
            minlength: [1, 'Currency symbol must contain at least 1 sign']
        },

        name: { // e.g. United States Dollar
            type: String,
            required: [true, 'Currency name is required'],
            trim: [true, 'Currency name cannot start with and end with spaces'],
            unique: [true, 'Currency name must be unique'],
            maxlength: [50, 'Currency name must have at most 50 letters']
        },
    },

    {
        timestamps: true,
        versionKey: false
    }
);

// Add indexes on the specific fields of the documents
currencySchema.index({ code: 1 });


export default model<Currency>('Currency', currencySchema);
