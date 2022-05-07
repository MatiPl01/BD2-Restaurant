import PersistenceEnum from '@/utils/enums/persistence.enum';
import CurrencyEnum from '@/utils/enums/currency.enum';
import Joi from 'joi';


const paramsUpdatePersistence = Joi.object({
    value: Joi.string().valid(...Object.values(PersistenceEnum))
});

const paramsUpdateMainCurrency = Joi.object({
    value: Joi.string().valid(...Object.values(CurrencyEnum))
});

export default {
    paramsUpdatePersistence, paramsUpdateMainCurrency
};
