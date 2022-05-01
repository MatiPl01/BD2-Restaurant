import { Schema, model } from 'mongoose';
import Config from '@/resources/config/config.interface';


const configSchema = new Schema(
    {

    },
    {
        versionKey: false
    }
);


export default model<Config>('Config', configSchema);
