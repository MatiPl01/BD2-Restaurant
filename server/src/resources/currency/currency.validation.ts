import Joi from 'joi';


export const currencyValidators = {
    code: Joi.string().trim().length(3).uppercase().required().messages({
        'any.required': 'Please provide currency code',
        'string.trim': 'Currency code cannot start with and end with spaces',
        'string.length': 'Currency code must contain 3 letters',
        'string.uppercase': 'Currency code must be uppercase'
    }),

    symbol: Joi.string().trim().min(1).max(3).required().messages({
        'any.required': 'Currency symbol is required',
        'string.trim': 'Currency symbol cannot start with and end with spaces',
        'string.min': 'Currency symbol must contain at least 1 sign',
        'string.max': 'Currency symbol must contain at most 3 signs'
    }),

    name: Joi.string().trim().max(50).required().messages({
        'any.required': 'Currency name is required',
        'string.trim': 'Currency name cannot start with and end with spaces',
        'string.max': 'Currency name must have at most 50 letters'
    })
}


const params = {
    currencyCode: currencyValidators.code
};

const body = {
    createCurrency: Joi.object(currencyValidators)
};


export default {
    body,
    params
};
