import ExchangeRateModel from '@/resources/exchange-rate/exchange-rate.model';
import ExchangeRate from '@/resources/exchange-rate/exchange-rate.interface';
import AppError from '@/utils/errors/app.error';


class ExchangeRateService {
    private exchangeRate = ExchangeRateModel

    public async getExchangeRate(
        from: string,
        to: string
    ): Promise<ExchangeRate> {
        const exchangeRate = await this.exchangeRate.findOne({ from, to });
        if (exchangeRate) return exchangeRate;

        throw new AppError(500, `Cannot find Exchange Rate from ${from} to ${to}`);
    }

    public async createExchangeRate(
        exchangeRateData: ExchangeRate
    ): Promise<ExchangeRate> { // TODO - add automatic creating reversed exchange rate

        return await this.exchangeRate.create(exchangeRateData);
    }

    public async updateExchangeRate(
        from: string,
        to: string,
        rate: number
    ): Promise<ExchangeRate[]> {
        const rate1 = Math.ceil(rate * 10000) / 10000;
        const exchangeRate1 = await this.exchangeRate.findOneAndUpdate(
            { from, to },
            { $set: { rate: rate1 } },
            { new: true }
        );
        if (!exchangeRate1) throw new AppError(404, `Cannot find exchange rate from ${from} to ${to}`);

        const rate2 = Math.ceil(1 / rate * 10000) / 10000;
        const exchangeRate2 = await this.exchangeRate.findOneAndUpdate(
            { from: to, to: from },
            { $set: { rate: rate2 } },
            { new: true }
        );
        if (!exchangeRate2) throw new AppError(404, `Cannot find exchange rate from ${to} to ${from}`);

        return [exchangeRate1, exchangeRate2];
    }
}


export default ExchangeRateService;