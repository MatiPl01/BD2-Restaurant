import Config from '@/resources/config/config.interface';
import AppError from '@/utils/errors/app.error';
import ConfigModel from '@/resources/config/config.model';
import PersistenceEnum from "@/utils/enums/persistence.enum";
import CurrencyEnum from "@/utils/enums/currency.enum";


class ConfigService {
    private config = ConfigModel

    public async getPersistence(): Promise<PersistenceEnum> {
        return await this.config.find().limit(1).then(x => x[0].persistence);
    };

    public async getMainCurrency(): Promise<CurrencyEnum> {
        return await this.config.find().limit(1).then(x => x[0].mainCurrency);
    };

    public async updatePersistence(
        newPersistence: string
    ): Promise<Config> {
        const result = await this.config.findOneAndUpdate(
            {},
            {persistence: newPersistence},
            {new: true}
        );
        if (result) return result;

        throw new AppError(201, `Cannot update Persistence to ${newPersistence}`);
    };

    public async updateMainCurrency(
        newMainCurrency: string
    ): Promise<Config> {
        const result = await this.config.findOneAndUpdate(
            {},
            {mainCurrency: newMainCurrency},
            {new: true}
        );
        if (result) return result;

        throw new AppError(203, `Cannot update Main Currency to ${newMainCurrency}`);
    };
}

export default ConfigService;
