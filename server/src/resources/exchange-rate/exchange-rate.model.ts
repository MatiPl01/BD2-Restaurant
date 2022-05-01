import { Schema, model } from 'mongoose';
import ExchangeRate from "@/resources/exchange-rate/exchange-rate.interface";


const exchangeRateSchema = new Schema(
    {
        rate: {
            type: Number,
            min: [0, 'Exchange rate cannot be lower than 0'],
            required: [true, 'Exchange rate is required'],
        },
        
        from: {
            type: String,
            uppercase: [true, "'from' currency code must be uppercase"],
            length: [3, "'from' currency code must have exactly 3 letters"],
            required: [true, "Please provide an exchange 'from' currency code"]
        },

        to: {
            type: String,
            uppercase: [true, "'to' currency code must be uppercase"],
            length: [3, "'to' currency code must have exactly 3 letters"],
            required: [true, "Please provide an exchange 'to' currency code"]
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);


export default model<ExchangeRate>('ExchangeRate', exchangeRateSchema);
