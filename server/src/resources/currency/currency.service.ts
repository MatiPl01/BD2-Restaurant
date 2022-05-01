import CurrencyModel from "@/resources/currency/currency.model";
import Currency from "@/resources/currency/currency.interface";
import AppError from "@/utils/errors/app.error";


class CurrencyService {
    private currencies = CurrencyModel;

    public async getCurrency(code: string): Promise<Currency> {
        const result = await this.currencies.findOne({ code });
        if (result) return result;
        
        throw new AppError(404, `Currency with code ${code} was not found`);
    }

    public async getAllCurrencies(): Promise<Currency[]> {
        return await this.currencies.find();
    }
}


export default CurrencyService;
