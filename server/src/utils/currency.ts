import ExchangeRateService from "@/resources/exchange-rate/exchange-rate.service";
import { ClientSession } from 'mongoose';
import configModel from "@/resources/config/config.model";
import dishModel from "@/resources/dish/dish.model";
import AppError from "./errors/app.error";
import Dish from "@/resources/dish/dish.interface";

// TODO - maybe change ExchangeRateService methods to static and
// don't use it as an instance in here
const exchangeRateService = new ExchangeRateService();

const exchangeCurrency = async (
    amount: number,
    from: string,
    to: string,
    session?: ClientSession
) => {
    let rate = 1;
    if (from !== to) {
        rate = (await exchangeRateService.getExchangeRate(from, to, session)).rate;
    }
    return Math.ceil(amount * rate * 10000) / 10000;
};

const exchangeToMainCurrency = async (
    amount: number,
    from: string,
    session?: ClientSession
): Promise<number> => {
    let config; 
    if (session) config = await configModel.findOne({}, {}, { session });
    else config = await configModel.findOne();

    if (!config) throw new AppError(404, 'Config was not found in the database');

    return await exchangeCurrency(amount, from, config.mainCurrency, session);
};

const changeDishCurrency = async (
    dish: Dish,
    to: string
): Promise<void> => {
    let from: string;

    if (dish.unitPrice === undefined && dish.currency === undefined) return;
    if (dish.currency === undefined) {
        const dishCurrency = (await dishModel.findById(dish.id))?.currency;
        if (!dishCurrency) throw new AppError(404, `Cannot find dish with id ${dish.id}`);
        from = dishCurrency;
    } else {
        from = dish.currency;
        dish.currency = to;
    }

    if (dish.unitPrice !== undefined) {
        dish.unitPrice = await exchangeCurrency(dish.unitPrice, from, to);
    }
};


export default {
    exchangeCurrency,
    exchangeToMainCurrency,
    changeDishCurrency
};
