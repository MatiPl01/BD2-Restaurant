import { ClientSession } from 'mongoose';
import singleTransaction from '@/utils/single-transaction';
import ConfigModel from '@/resources/config/config.model';
import AppError from '@/utils/errors/app.error';
import Config from '@/resources/config/config.interface';


class ConfigService {
    private config = ConfigModel

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
            session ? { new: true, session } : { new: true }
        );

        if (config) {
            await config.updateMainCurrency(mainCurrency, session);
            return config;
        }

        throw new AppError(400, 'Cannot update config');
    })
}


export default ConfigService;
