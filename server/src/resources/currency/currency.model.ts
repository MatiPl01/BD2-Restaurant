import { Schema, model } from 'mongoose';
import Currency from '@/resources/currency/currency.interface';

const currencySchema = new Schema(
    {
        code: { // e.g. USD
            type: String,
            required: true,
            unique: true
        },
        symbol: { // e.g. $
            type: String,
            required: true,
            unique: true
        },
        name: { // e.g. United States Dollar
            type: String,
            required: true,
            unique: true
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

export default model<Currency>('Currency', currencySchema);
