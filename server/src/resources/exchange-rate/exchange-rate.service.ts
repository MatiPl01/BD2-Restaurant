import { ClientSession } from 'mongoose';
import ExchangeRateModel from '@/resources/exchange-rate/exchange-rate.model';
import singleTransaction from '@/utils/single-transaction';
import ExchangeRate from '@/resources/exchange-rate/exchange-rate.interface';
import configModel from '../config/config.model';
import dishModel from '../dish/dish.model';
import AppError from '@/utils/errors/app.error';


class ExchangeRateService {
    private exchangeRate = ExchangeRateModel
    private config = configModel;
    private dish = dishModel;

    public async getExchangeRate(
        from: string,
        to: string,
        rateDate?: Date,
        session?: ClientSession
    ): Promise<ExchangeRate> {
        let filter = rateDate ? { createdAt: { $lte: new Date(rateDate) } } : {};
        const exchangeRate = await this.exchangeRate
            .find({ from, to, ...filter }, {}, { session })
            .sort({ createdAt: -1 })
            .limit(1);
        
        if (!exchangeRate.length) throw new AppError(404, 
            `Cannot find Exchange Rate from ${from} to ${to}${rateDate ? ' at ' + rateDate : ''}`
        );
        
        return exchangeRate[0];
    }

    public createExchangeRate = singleTransaction(async (
        session: ClientSession,
        exchangeRateData: ExchangeRate
    ): Promise<ExchangeRate[]> => {
        let { from, to, rate } = exchangeRateData;
        rate = this.ceilDecimalDigits(rate);
        await this.updateDishesUnitPrice(session, from, to, rate);

        rate = this.ceilDecimalDigits(1 / rate);
        await this.updateDishesUnitPrice(session, to, from, rate);
        
        const inverseExchangeRateData = { from: to, to: from, rate };

        return await this.exchangeRate.create([
            exchangeRateData,
            inverseExchangeRateData
        ], { session });
    })

    public deleteExchangeRate = singleTransaction(async (
        session: ClientSession,
        from: string,
        to: string
    ): Promise<void> => {
        if (from === to) {
            throw new AppError(400, 'Both specified currencies must be different');
        }

        if (![
            await this.exchangeRate.deleteOne({ from, to }, { session }),
            await this.exchangeRate.deleteOne({ from: to, to: from }, { session })
        ].every(res => res !== null)) {
            throw new AppError(404, `Cannot delete exchange rate from ${from} to ${to}`);
        }
    })

    private async updateDishesUnitPrice(
        session: ClientSession,
        from: string,
        to: string,
        rate: number
    ): Promise<void> {
        const exchangeRate = await this.exchangeRate.findOne({ from, to }, {}, { session });

        if (exchangeRate) {
            const config = await this.config.findOne().session(session);
            if (!config || !config.mainCurrency) {
                throw new AppError(404, 'Cannot get the main currency');
            }

            if (to === config.mainCurrency) {
                const dishes = await this.dish.find({ currency: from }, {}, { session });
                for (const dish of dishes) {
                    dish.mainUnitPrice = this.ceilDecimalDigits(dish.unitPrice * rate);
                    await dish.save({ session });
                }
            }
        }
    }

    private ceilDecimalDigits(
        num: number,
        digitsCount: number = 4
    ): number {
        const pow = Math.pow(10, digitsCount);
        return Math.ceil(num * pow) / pow;
    }
}


export default ExchangeRateService;
