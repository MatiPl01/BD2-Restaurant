import { model, Schema, ClientSession } from 'mongoose';

import PersistenceEnum from '@/utils/enums/persistence.enum';

import DishModel from '@/resources/dish/dish.model';
import Config from './interfaces/config.interface';


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

        mainCurrency: { // e.g. USD
            type: String,
            required: [true, 'Please provide currency code'],
            unique: [true, 'Currency code must be unique'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        }
    },

    {
        versionKey: false,
        timestamps: true,
        collection: 'config'
    }
);

configSchema.methods.updateMainCurrency = async function (
    targetCurrency: string,
    session?: ClientSession  
): Promise<void> {
    if (targetCurrency === this.mainCurrency) return;

    this.mainCurrency = targetCurrency;

    for (const dish of await DishModel.find({}, {}, { session })) {
        await dish.updateMainUnitPrice.call(dish, targetCurrency, session);
        await dish.save({ session });
    }

    await this.save({ session });
}


export default model<Config>('Config', configSchema);
