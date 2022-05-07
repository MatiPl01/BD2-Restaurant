import Joi from 'joi';
import CurrencyEnum from "@/utils/enums/currency.enum";


const paramsUpdateExchangeRate = Joi.object({
    rate: Joi.number().min(0).required().messages({
        'number.min': 'Exchange rate cannot be lower than 0',
        'any.required': 'Exchange rate is required'
    })
});

const queryExchangeRate = Joi.object({
    from: Joi.string().valid(...Object.values(CurrencyEnum)),
    to: Joi.string().valid(...Object.values(CurrencyEnum))
});

export default {paramsUpdateExchangeRate, queryExchangeRate};
