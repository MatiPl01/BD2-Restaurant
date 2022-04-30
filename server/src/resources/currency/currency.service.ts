import CurrencyModel from '@/resources/currency/currency.model';
import Currency from '@/resources/currency/currency.interface';

class CurrencyService {
    private currencies = CurrencyModel;

    public async getCurrency(code: string): Promise<Currency> {
        const result = await this.currencies.findOne({ code });
        if (result) {
            return result;
        }
        throw new Error('Cannot get currency');
    }

    public async getAllCurrencies(): Promise<Currency[]> {
        try {
            return await this.currencies.find()
        } catch (error) {
            throw new Error('Cannot get currencies');
        }
    }
}

export default CurrencyService;
