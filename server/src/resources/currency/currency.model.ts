import { Schema, model } from 'mongoose';
import Currency from '@/resources/currency/currency.interface';
import CurrencyEnum from '@/utils/enums/currency.enum';


const currencySchema = new Schema(
    {
        code: { // e.g. USD
            type: String,
            required: [true, 'A currency must have a 3-letter code'],
            unique: [true, 'Currency code must be unique'],
            enum: {
                values: Object.values(CurrencyEnum),
                message: `Available roles are: ${Object.values(CurrencyEnum).join(', ')}`
            },
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
