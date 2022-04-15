import Joi from 'joi';

const getCurrency = Joi.object({

    id: Joi.string().required()

});

const getAllCurrencies = Joi.object({

});

export default {getCurrency,getAllCurrencies};
