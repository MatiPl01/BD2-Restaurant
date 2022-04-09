import CurrenciesModel from '@/resources/currencies/currencies.model';
import Currencies from '@/resources/currencies/currencies.interface';

class CurrenciesService {
    private currencies = CurrenciesModel;

    // public async create(code:string, symbol:string,name:string): Promise<Currencies> {
    //     try {
    //         return await this.currencies.create({code,symbol,name});
    //     } catch (error) {
    //         throw new Error('Unable to create currencies');
    //     }
    // }

    public async getCurrencies(id:string):Promise<Currencies>{
        const result = await this.currencies.findById(id);
        if(result){
            console.log(result);
            return result;
        }
        throw new Error('Unable to find currencies');
    }
}

export default CurrenciesService;
