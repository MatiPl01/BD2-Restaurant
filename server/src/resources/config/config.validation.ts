import Joi from 'joi';

import PersistenceEnum from '@/utils/enums/persistence.enum';

import { currencyValidators } from '@/resources/currency/currency.validation';
import sharedValidation from '@/resources/shared/shared.validation';


const configValidators = {
    persistence: Joi.string().valid(...Object.values(PersistenceEnum)),
    mainCurrency: currencyValidators.code.optional()
};

const body = {
    updateConfig: Joi.object({
        persistence: configValidators.persistence.optional(),
        mainCurrency: configValidators.mainCurrency.optional()
    })
};

const query = {
    getConfig: Joi.object({
        fields: sharedValidation.fields
    })
};


export default {
    body,
    query
};
