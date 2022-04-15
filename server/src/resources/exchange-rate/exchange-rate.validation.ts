import Joi from 'joi';

const getExchangeRate = Joi.object({

    from: Joi.string().required(),

    to: Joi.string().required(),

});

const changeRatio = Joi.object({

    ratio: Joi.number().required(),

    from: Joi.string().required(),

    to: Joi.string().required(),

});

export default { getExchangeRate,changeRatio};
