import { currencyValidators } from '../currency/currency.validation';
import Joi from 'joi';

const exchangeRateValidators = {
    from: currencyValidators.code,

    to: currencyValidators.code,

    rate: Joi.number().min(0).required().messages({
        'number.min': 'Exchange rate cannot be lower than 0',
        'any.required': 'Exchange rate is required'
    })
}

const params = {
    updateExchangeRate: Joi.object({
        from: exchangeRateValidators.from,
        to: exchangeRateValidators.to,
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
