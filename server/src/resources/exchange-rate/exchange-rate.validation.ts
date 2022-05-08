import CurrencyEnum from "@/utils/enums/currency.enum";
import Joi from 'joi';


const exchangeRateValidators = {
    from: Joi.string().valid(...Object.values(CurrencyEnum)).required(),

    to: Joi.string().valid(...Object.values(CurrencyEnum)).required(),

    rate: Joi.number().min(0).required().messages({
        'number.min': 'Exchange rate cannot be lower than 0',
        'any.required': 'Exchange rate is required'
    })
}

const params = {
    updateExchangeRate: Joi.object({
        from: exchangeRateValidators.from.optional(),
        to: exchangeRateValidators.to.optional(),
    })
}

const query = {
    exchangeRate: Joi.object({
        from: exchangeRateValidators.from,
        to: exchangeRateValidators.to,
    })
};

const body = {
    createExchangeRate: Joi.object(exchangeRateValidators),

    updateExchangeRate: Joi.object({
        rate: exchangeRateValidators.rate
    })
}


export default {
    body,
    params,
    query
};
