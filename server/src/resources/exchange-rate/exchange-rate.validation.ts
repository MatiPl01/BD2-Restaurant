import Joi from 'joi';
import CurrencyEnum from "@/utils/enums/currency.enum";


const exchangeRateValidators = {
    from: Joi.string().valid(...Object.values(CurrencyEnum)).required(),

    to: Joi.string().valid(...Object.values(CurrencyEnum)).required(),

    rate: Joi.number().min(0).required().messages({
        'number.min': 'Exchange rate cannot be lower than 0',
        'any.required': 'Exchange rate is required'
    })
}

const bodyUpdateExchangeRate = Joi.object({
    rate:exchangeRateValidators.rate,
});

const queryExchangeRate = Joi.object({
    from: exchangeRateValidators.from,
    to: exchangeRateValidators.to,
});

const createExchangeRate = Joi.object(exchangeRateValidators);


export default {
    bodyUpdateExchangeRate,
    createExchangeRate,
    queryExchangeRate
};