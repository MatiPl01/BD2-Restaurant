import CurrencyEnum from '@/utils/enums/currency.enum';
import PersistenceEnum from '@/utils/enums/persistence.enum';
import Joi from 'joi';


const updatePersistence = Joi.object({
    persistence: Joi.string().valid(...Object.values(PersistenceEnum)).required().messages({
        'any.required': 'Persistence is required'
    })
});

const updateMainCurrency = Joi.object({
    mainCurrency: Joi.string().valid(...Object.values(CurrencyEnum)).required().messages({
        'any.required': 'Main currency is required'
    })
});


export default { 
    updatePersistence,
    updateMainCurrency 
};
