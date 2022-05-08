import ExchangeRateService from "@/resources/exchange-rate/exchange-rate.service";
import CurrencyEnum from "./enums/currency.enum";
import configModel from "@/resources/config/config.model";
import dishModel from "@/resources/dish/dish.model";
import AppError from "./errors/app.error";
import Dish from "@/resources/dish/dish.interface";

// TODO - maybe change ExchangeRateService methods to static and
// don't use it as an instance in here
const exchangeRateService = new ExchangeRateService();

const exchangeCurrency = async (
    amount: number,
    from: CurrencyEnum,
    to: CurrencyEnum
) => {
    let rate = 1;
    if (from !== to) {
        rate = (await exchangeRateService.getExchangeRate(from, to)).rate;
    }
    return Math.ceil(amount * rate * 100) / 100;
};

const exchangeToMainCurrency = async (
    amount: number,
    from: CurrencyEnum
): Promise<number> => {
    const config = await configModel.findOne();
    if (!config) throw new AppError(404, 'Config was not found in the database');

    return await exchangeCurrency(amount, from, config.mainCurrency);
}

const changeDishCurrency = async (
    dish: Dish,
    to: CurrencyEnum
): Promise<void> => {
    let from: CurrencyEnum;

    if (dish.unitPrice === undefined && dish.currency === undefined) return;
    if (dish.currency === undefined) {
        const dishCurrency = (await dishModel.findById(dish.id))?.currency;
        if (!dishCurrency) throw new AppError(404, `Cannot find dish with id ${dish.id}`);
        from = dishCurrency as CurrencyEnum;
    } else {
        from = dish.currency as CurrencyEnum;
        dish.currency = to;
    }

    if (dish.unitPrice !== undefined) {
        dish.unitPrice = await exchangeCurrency(dish.unitPrice, from, to);
    }
}


export default {
    exchangeCurrency,
    exchangeToMainCurrency,
    changeDishCurrency
};