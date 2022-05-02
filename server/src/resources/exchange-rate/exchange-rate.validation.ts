import Joi from 'joi';


const updateExchangeRate = Joi.object({
    rate: Joi.number().min(0).required().messages({
        'number.min': 'Exchange rate cannot be lower than 0',
        'any.required': 'Exchange rate is required'
    })
});


export default { updateExchangeRate };
