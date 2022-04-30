import Joi from 'joi';

const updateExchangeRate = Joi.object({
    ratio: Joi.number().required()
});

export default { updateExchangeRate };
