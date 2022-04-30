import ExchangeRateModel from '@/resources/exchange-rate/exchange-rate.model';
import ExchangeRate from '@/resources/exchange-rate/exchange-rate.interface';

class ExchangeRateService {
    private exchangeRates = ExchangeRateModel

    public async getExchangeRate(from: string, to: string): Promise<ExchangeRate> {
        const result = await this.exchangeRates.findOne({ from, to });
        if (result) return result;

        throw new Error(`Cannot find Exchange Rate from ${from} to ${to}`);
    };

    public async updateExchangeRate(from: string, to: string, ratio: number): Promise<ExchangeRate> {
        const result = await this.exchangeRates.findOneAndUpdate(
            { from, to },
            { ratio },
            { new: true }
        );
        if (result) return result;

        throw new Error(`Cannot update Exchange Rate from ${from} to ${to}`);
    }
}

export default ExchangeRateService;
