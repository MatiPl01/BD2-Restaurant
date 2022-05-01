import Joi from 'joi';

const updateExchangeRate = Joi.object({
    rate: Joi.number().required()
});

export default { updateExchangeRate };
