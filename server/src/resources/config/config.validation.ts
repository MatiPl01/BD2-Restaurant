import PersistenceEnum from '@/utils/enums/persistence.enum';
import CurrencyEnum from '@/utils/enums/currency.enum';
import Joi from 'joi';


const updateConfig = Joi.object({
    persistence: Joi.string().valid(...Object.values(PersistenceEnum)),
    mainCurrency: Joi.string().valid(...Object.values(CurrencyEnum))
});

export default {
    updateConfig
};
