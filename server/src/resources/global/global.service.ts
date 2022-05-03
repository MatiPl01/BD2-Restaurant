import GlobalModel from '@/resources/global/global.model';
import Global from '@/resources/global/global.interface';
import AppError from '@/utils/errors/app.error';


class GlobalService {
    private global = GlobalModel

    public async getPersistence(): Promise<number|null> {
        return await this.global.find().limit(1).then(x=> x[0].persistence);
    };

    public async getMainCurrency(): Promise<string|null> {
        return await this.global.find().limit(1).then(x=> x[0].mainCurrency);
    };

    public async updatePersistence(
        newPersistence: number
    ): Promise<Global> {
        const result = await this.global.findOneAndUpdate(
            {},
            {persistence:newPersistence},
            { new: true }
        );
        if (result) return result;

        throw new AppError(400, `Cannot update Persistence to ${newPersistence} `);
    };

    public async updateMainCurrency(
        newMainCurrency: string
    ): Promise<Global> {
        console.log(newMainCurrency)
        const result = await this.global.findOneAndUpdate(
            {},
            {mainCurrency:newMainCurrency},
            { new: true }
        );
        if (result) return result;

        throw new AppError(400, `Cannot update Main Currency to ${newMainCurrency} `);
    };
}


export default GlobalService;
