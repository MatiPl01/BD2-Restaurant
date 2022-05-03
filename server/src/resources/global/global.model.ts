import { Schema, model } from 'mongoose';
import Global from "@/resources/global/global.interface";


const GlobalSchema = new Schema(
    {
        persistence: {
            type: Number,
            min: [0, 'Persistence cannot be lower than 0'],
            max: [2, 'Persistence cannot be higher than 2'],
            required: [true, 'Persistence is required'],
        },
        mainCurrency: {
            type: String,
            required: [true, 'Main Currency is required']
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);


export default model<Global>('globals', GlobalSchema);
