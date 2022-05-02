import CurrencyEnum from '@/utils/enums/currency.enum';
import PersistenceEnum from '@/utils/enums/persistence.enum';
import Joi from 'joi';


const update = {
    persistence: Joi.string().valid(...Object.values(PersistenceEnum)),
    mainCurrency: Joi.string().valid(...Object.values(CurrencyEnum))
}


export default {
    update
};
