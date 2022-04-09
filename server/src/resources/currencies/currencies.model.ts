import { Schema, model } from 'mongoose';
import Currencies from '@/resources/currencies/currencies.interface';

const currenciesSchema = new Schema(
    {
        _id:{
          type:Schema.Types.ObjectId
        },
        code: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<Currencies>('Currencies', currenciesSchema);
