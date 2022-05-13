import Config from '@/resources/config/config.interface';
import AppError from '@/utils/errors/app.error';
import dishModel from '../dish/dish.model';
import ConfigModel from '@/resources/config/config.model';


class ConfigService {
    private config = ConfigModel

    public async getConfig(): Promise<Config> {
        const config = await this.config.findOne();
        if (config) return config;

        throw new AppError(404, 'Cannot get config');
    }

    public async updateConfig(
        updatedProps: { [key: string]: any }
    ): Promise<Config> {
        const { mainCurrency } = updatedProps;
        if (mainCurrency) delete updatedProps['mainCurrency'];
        
        const config = await this.config.findOneAndUpdate(
            {},
            { $set: updatedProps },
            { new: true }
        );

        if (config) {
            await config.updateMainCurrency(mainCurrency);
            await config.save(); // Call this to run pre('save') middleware
            return config;
        }

        throw new AppError(400, 'Cannot update config');
    };
}


export default ConfigService;
