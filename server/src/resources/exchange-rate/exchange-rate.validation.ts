import Joi from 'joi';

import { currencyValidators } from '@/resources/currency/currency.validation';


const exchangeRateValidators = {
    from: currencyValidators.code,
    to: currencyValidators.code,
    rate: Joi.number().min(0).required().messages({
        'number.min': 'Exchange rate cannot be lower than 0',
        'any.required': 'Exchange rate is required'
    })
}

const body = {
    createExchangeRate: Joi.object(exchangeRateValidators)
};

const query = {
    exchangeRate: Joi.object({
        from: exchangeRateValidators.from,
        to: exchangeRateValidators.to,
        date: Joi.date()
    })
};


export default {
    body,
    query
};
