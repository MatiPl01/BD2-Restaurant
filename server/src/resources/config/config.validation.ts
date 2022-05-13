import { currencyValidators } from '../currency/currency.validation';
import PersistenceEnum from '@/utils/enums/persistence.enum';
import Joi from 'joi';

const body = {
    updateConfig: Joi.object({
        persistence: Joi.string().valid(...Object.values(PersistenceEnum)),
        mainCurrency: currencyValidators.code.optional()
    })
};

export default {
    body
};
