import Joi from 'joi';

import PersistenceEnum from '@/utils/enums/persistence.enum';

import { currencyValidators } from '@/resources/currency/currency.validation';


const body = {
    updateConfig: Joi.object({
        persistence: Joi.string().valid(...Object.values(PersistenceEnum)),
        mainCurrency: currencyValidators.code.optional()
    })
};


export default {
    body
};
