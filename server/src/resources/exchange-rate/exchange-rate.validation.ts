import Joi from 'joi';

const getExchangeRate = Joi.object({});

const updateExchangeRate = Joi.object({
    ratio: Joi.number().required()
});

export default { getExchangeRate, updateExchangeRate };
