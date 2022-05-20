import AppError from '@/utils/errors/app.error';

import currencyModel from './currency.model';
import Currency from './currency.interface';


class CurrencyService {
    private currency = currencyModel;

    public async getCurrency(
        code: string
    ): Promise<Currency> {
        const result = await this.currency.findOne({ code });
        if (result) return result;

        throw new AppError(300, `Currency with code ${code} was not found`);
    }

    public async getAllCurrencies(): Promise<Currency[]> {
        return this.currency.find();
    }

    public async createCurrency(
        currencyData: Currency
    ): Promise<Currency> {
        return await this.currency.create(currencyData);
    }

    public async deleteCurrency(
        code: string
    ): Promise<void> {
        const deletedCurrency = await this.currency.deleteOne({ code });

        if (!deletedCurrency) throw new AppError(404, `Cannot delete currency with code ${code}`);
    }
}


// Create and export currency service singleton instance
export default new CurrencyService();
