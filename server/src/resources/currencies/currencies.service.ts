import CurrenciesModel from '@/resources/currencies/currencies.model';
import Currencies from '@/resources/currencies/currencies.interface';

class CurrenciesService {
    private currencies = CurrenciesModel;

    public async getCurrency(id: string): Promise<Currencies> {
        const result = await this.currencies.findById(id);
        if (result) {
            return result;
        }
        throw new Error('Unable to find currencies');
    }

    public async getAllCurrencies(): Promise<Currencies[]> {
        try{
            return await this.currencies.find()
        } catch(error){
            throw new Error('Unable to find currencies');
        }
    }
}

export default CurrenciesService;
