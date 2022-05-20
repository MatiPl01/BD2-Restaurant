import { ClientSession } from 'mongoose';

import singleTransaction from '@/utils/single-transaction';
import AppError from '@/utils/errors/app.error';

import ConfigModel from '@/resources/config/config.model';
import DishModel from '@/resources/dish/dish.model';
import ExchangeRateModel from './exchange-rate.model';
import ExchangeRate from './exchange-rate.interface';


class ExchangeRateService {
    private exchangeRate = ExchangeRateModel;
    private config = ConfigModel;
    private dish = DishModel;

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
        to: string,
        date?: Date
    ): Promise<void> => {
        if (from === to) {
            throw new AppError(400, 'Both specified currencies must be different');
        }

        const exchangeRates = [
            await this.exchangeRate.find(
                { from, to, createdAt: { $lte: date || new Date() } },
                {},
                { session }
            )
                .sort({ createdAt: -1 })
                .limit(1),

            await this.exchangeRate.find(
                { from: to, to: from, createdAt: { $lte: date || new Date() } },
                {},
                { session }
            )
                .sort({ createdAt: -1 })
                .limit(1)
        ]
        
        for (const [exchangeRate] of exchangeRates) {
            if (!exchangeRate) {
                throw new AppError(404, `Cannot delete exchange rate from ${from} to ${to}${date ? ' at ' + date : ''}`);
            }
            await this.exchangeRate.findByIdAndDelete(exchangeRate._id);
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

    public ceilDecimalDigits(
        num: number,
        digitsCount: number = 4
    ): number {
        const pow = Math.pow(10, digitsCount);
        return Math.ceil(num * pow) / pow;
    }
}


// Create and export exchange rate service singleton instance
export default new ExchangeRateService();
