import CurrencyEnum from '@/utils/enums/currency.enum';
import Joi from 'joi';


const paramsUpdatePersistence = Joi.object({
    code: Joi.string().valid(...Object.values(CurrencyEnum))
});

export default {
    paramsUpdatePersistence
};
