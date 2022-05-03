import { Schema, model } from 'mongoose';
import Config from '@/resources/config/config.interface';
import PersistenceEnum from '@/utils/enums/persistence.enum';
import CurrencyEnum from '@/utils/enums/currency.enum';


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
        versionKey: false
    }
);


export default model<Config>('Config', configSchema);
