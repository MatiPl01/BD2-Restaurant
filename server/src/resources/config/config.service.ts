import { ClientSession } from 'mongoose';

import singleTransaction from '@/utils/single-transaction';
import AppError from '@/utils/errors/app.error';

import ConfigModel from './config.model';
import Config from './interfaces/config.interface';


class ConfigService {
    private config = ConfigModel;

    public updateConfig = singleTransaction(async (
        session: ClientSession,
        updatedProps: { [key: string]: any }
    ): Promise<Config> => {
        const { mainCurrency } = updatedProps;
        if (mainCurrency) delete updatedProps['mainCurrency'];
        
        const config = await this.config.findOneAndUpdate(
            {},
            { $set: updatedProps },
            { new: true, session }
        );

        if (!config) throw new AppError(400, 'Cannot update config');

        if (mainCurrency) await config.updateMainCurrency(mainCurrency, session);
        return config;
    })
}


// Create and export config service singleton instance
export default new ConfigService();
