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

const paramsUpdateExchangeRate = Joi.object({
    from: exchangeRateValidators.from.optional(),
    to: exchangeRateValidators.to.optional(),
});

const queryExchangeRate = Joi.object({
    from: exchangeRateValidators,
    to: exchangeRateValidators,
});

const createExchangeRate = Joi.object(exchangeRateValidators);


export default {
    paramsUpdateExchangeRate, 
    createExchangeRate,
    queryExchangeRate
};
