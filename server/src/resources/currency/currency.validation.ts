import CurrencyEnum from '@/utils/enums/currency.enum';
import Joi from 'joi';


const params = {
    updatePersistence: Joi.object({
        code: Joi.string().valid(...Object.values(CurrencyEnum))
    })
};

export default {
    params
};
