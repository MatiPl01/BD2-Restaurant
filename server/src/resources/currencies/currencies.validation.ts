import Joi from 'joi';

const create = Joi.object({
    code: Joi.string().required(),

    symbol: Joi.string().required(),

    name: Joi.string().required(),

});

const getCurrencies=Joi.object({

    id: Joi.string().required()

});

export default { create,getCurrencies};
