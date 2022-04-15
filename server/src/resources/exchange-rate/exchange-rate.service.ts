import ExchangeRateModel from '@/resources/exchange-rates/exchangeRate.model';
import ExchangeRate from '@/resources/exchange-rates/exchangeRate.interface';

class ExchangeRateService {
    private exchangeRates = ExchangeRateModel

    public async getExchangeRate(from: string, to: string): Promise<ExchangeRate> {
        const result = await this.exchangeRates.findOne({"from":from,"to":to});

        if (result) {
            return result;
        }
        throw new Error('Unable to find Exchange Rate');
    };

    public async changeRatio(ratio:number,from: string, to: string):Promise<void> {
        const result = await this.exchangeRates.updateOne({"from":from,"to":to},{"ratio":ratio});
        console.log(result)
        if (result.modifiedCount==0 || result.matchedCount==0) {
            throw new Error('Unable to find Exchange Rate');
        }
    }

}

export default ExchangeRateService;
