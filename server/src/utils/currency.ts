import { ClientSession } from 'mongoose';

import exchangeRateService from '@/resources/exchange-rate/exchange-rate.service';
import configModel from '@/resources/config/config.model';
import dishModel from '@/resources/dish/dish.model';
import Dish from '@/resources/dish/dish.interface';

import AppError from './errors/app.error';


const exchangeCurrency = async (
    amount: number,
    from: string,
    to: string,
    rateDate?: Date,
    session?: ClientSession
) => {
    let rate = 1;
    rateDate = rateDate || new Date();
    if (from !== to) {
        rate = (await exchangeRateService.getExchangeRate(from, to, rateDate, session)).rate;
    }
    return Math.ceil(amount * rate * 10000) / 10000;
};

const exchangeToMainCurrency = async (
    amount: number,
    from: string,
    session?: ClientSession
): Promise<number> => {
    let config; 
    if (session) config = await configModel.findOne().session(session);
    else config = await configModel.findOne();

    if (!config) throw new AppError(404, 'Config was not found in the database');

    return await exchangeCurrency(amount, from, config.mainCurrency, undefined, session);
};

const changeDishCurrency = async (
    dish: Dish,
    to: string,
    rateDate?: Date,
    session?: ClientSession
): Promise<void> => {
    let from: string;

    if (dish.unitPrice === undefined && dish.currency === undefined) return;
    if (dish.currency === undefined) {
        let dishCurrency;
        
        if (session) {
            dishCurrency = (await dishModel.findById(dish.id).session(session))?.currency;
        } else {
            dishCurrency = (await dishModel.findById(dish.id))?.currency;
        }

        if (!dishCurrency) throw new AppError(404, `Cannot find dish with id ${dish.id}`);
        from = dishCurrency;
    } else {
        from = dish.currency;
        dish.currency = to;
    }

    if (dish.unitPrice !== undefined) {
        dish.unitPrice = await exchangeCurrency(dish.unitPrice, from, to, rateDate, session);
    }
};


export default {
    exchangeCurrency,
    exchangeToMainCurrency,
    changeDishCurrency
};
