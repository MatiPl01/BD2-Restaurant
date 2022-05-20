import { ClientSession } from 'mongoose';

import singleTransaction from '@/utils/single-transaction';
import AppError from '@/utils/errors/app.error';

import configModel from './config.model';
import Config from './config.interface';


class ConfigService {
    private config = configModel;

    public async getConfig(): Promise<Config> {
        const config = await this.config.findOne();
        if (config) return config;

        throw new AppError(404, 'Cannot get config');
    }

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

        await config.updateMainCurrency(mainCurrency, session);
        return config;
    })
}


// Create and export config service singleton instance
export default new ConfigService();
