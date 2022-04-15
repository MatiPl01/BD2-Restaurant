import { Schema, model } from 'mongoose';
import ExchangeRate from "@/resources/exchangeRates/exchangeRate.interface";

const exchangeRateSchema = new Schema(
    {
        ratio: {
            type: Number,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<ExchangeRate>('exchangeRates', exchangeRateSchema);
