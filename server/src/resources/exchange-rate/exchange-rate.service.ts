import ExchangeRateModel from '@/resources/exchange-rate/exchange-rate.model';
import ExchangeRate from '@/resources/exchange-rate/exchange-rate.interface';
import AppError from '@/utils/errors/app.error';


class ExchangeRateService {
    private exchangeRate = ExchangeRateModel

    public async getExchangeRate(
        from: string,
        to: string
    ): Promise<ExchangeRate> {
        const result = await this.exchangeRate.findOne({from, to});
        if (result) return result;

        throw new AppError(500, `Cannot find Exchange Rate from ${from} to ${to}`);
    };

    public async updateExchangeRate(
        from: string,
        to: string,
        rate: number
    ): Promise<ExchangeRate> {
        const result = await this.exchangeRate.findOneAndUpdate(
            {from, to},
            {rate},
            {new: true}
        );
        if (result) return result;

        throw new AppError(501, `Cannot update Exchange Rate from ${from} to ${to}`);
    }
}


export default ExchangeRateService;
