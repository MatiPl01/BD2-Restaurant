import Config from '@/resources/config/config.interface';
import AppError from '@/utils/errors/app.error';
import ConfigModel from '@/resources/config/config.model';


class ConfigService {
    private config = ConfigModel

    public async getConfig(): Promise<Config> {
        const config = await this.config.findOne();
        if (config) return config;

        throw new AppError(404, 'Cannot get config');
    }

    public async updateConfig(
        updatedProps: { [key: string]: number }
    ): Promise<Config> {
        const updatedConfig = await this.config.findOneAndUpdate(
            {},
            { $set: updatedProps },
            { new: true }
        );
        if (updatedConfig) return updatedConfig;

        throw new AppError(400, 'Cannot update config');
    };
}


export default ConfigService;