import {model, Schema} from 'mongoose';
import ExchangeRate from "@/resources/exchange-rate/exchange-rate.interface";
import CurrencyEnum from '@/utils/enums/currency.enum';


const exchangeRateSchema = new Schema(
    {
        rate: {
            type: Number,
            min: [0, 'Exchange rate cannot be lower than 0'],
            required: [true, 'Exchange rate is required'],
        },

        from: {
            type: String,
            required: [true, 'Please provide a currency \'from\' code'],
            enum: {
                values: Object.values(CurrencyEnum),
                message: `Available roles are: ${Object.values(CurrencyEnum).join(', ')}`
            },
        },

        to: {
            type: String,
            required: [true, 'Please provide a currency \'to\' code'],
            enum: {
                values: Object.values(CurrencyEnum),
                message: `Available roles are: ${Object.values(CurrencyEnum).join(', ')}`
            },
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
