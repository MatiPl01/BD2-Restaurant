import { Schema, model } from 'mongoose';
import Currency from '@/resources/currency/currency.interface';


const currencySchema = new Schema(
    {
        code: { // e.g. USD
            type: String,
            required: [true, 'A currency must have a 3-letter code'],
            unique: [true, 'Currency code must be unique'],
            length: [3, 'Currency code must have exactly 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        },
        symbol: { // e.g. $
            type: String,
            required: [true, 'Currency symbol is required'],
            unique: [true, 'Currency symbol must be unique'],
            maxlength: [3, 'Currency symbol must contain at most 3 signs'],
            minlength: [1, 'Currency symbol must contain at least 1 sign']
        },
        name: { // e.g. United States Dollar
            type: String,
            required: [true, 'Currency name is required'],
            unique: [true, 'CUrrency name must be unique'],
            maxlength: [50, 'Currency name must have at most 50 letters']
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);


export default model<Currency>('Currency', currencySchema);
