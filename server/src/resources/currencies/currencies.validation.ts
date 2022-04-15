import Joi from 'joi';

const create = Joi.object({
    code: Joi.string().required(),

    symbol: Joi.string().required(),

    name: Joi.string().required(),

});

const getCurrency = Joi.object({

    id: Joi.string().required()

});

const getAllCurrencies = Joi.object({

});

export default { create, getCurrency,getAllCurrencies};
