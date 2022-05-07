import {model, Schema} from 'mongoose';
import Config from "@/resources/config/config.interface";
import CurrencyEnum from '@/utils/enums/currency.enum';
import PersistenceEnum from '@/utils/enums/persistence.enum';


const configSchema = new Schema(
    {
        persistence: {
            type: String,
            required: [true, 'Please provide a persistence mode'],
            enum: {
                values: Object.values(PersistenceEnum),
                message: `Available roles are: ${Object.values(PersistenceEnum).join(', ')}`
            },
        },

        mainCurrency: {
            type: String,
            required: [true, 'Please provide the main currency'],
            enum: {
                values: Object.values(CurrencyEnum),
                message: `Available roles are: ${Object.values(CurrencyEnum).join(', ')}`
            },
        }
    },

    {
        versionKey: false,
        collection: 'config'
    }
);


export default model<Config>('Config', configSchema);
