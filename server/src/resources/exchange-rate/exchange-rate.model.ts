import { Schema, model } from 'mongoose';
import ExchangeRate from "@/resources/exchange-rate/exchange-rate.interface";

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

export default model<ExchangeRate>('ExchangeRate', exchangeRateSchema);
