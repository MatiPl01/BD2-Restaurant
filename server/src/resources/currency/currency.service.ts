import CurrencyModel from './currency.model';
import Currency from './interfaces/currency.interface';


class CurrencyService {
    private currency = CurrencyModel;

    public async getAllCurrencies(): Promise<Currency[]> {
        return this.currency.find();
    }

    public async createCurrency(
        currencyData: Currency
    ): Promise<Currency> {
        return await this.currency.create(currencyData);
    }
}


// Create and export currency service singleton instance
export default new CurrencyService();
