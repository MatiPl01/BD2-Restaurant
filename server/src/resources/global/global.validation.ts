import Joi from 'joi';


const updatePersistence = Joi.object({
    persistence: Joi.number().min(0).max(2).required().messages({
        'number.min': 'Persistence cannot be lower than 0',
        'number.max': 'Persistence cannot be higher than 2',
        'any.required': 'Persistence is required'
    })
});

const updateMainCurrency = Joi.object({
    mainCurrency: Joi.string().required().messages({
        'any.required': 'Main currency is required'
    })
});


export default { updatePersistence,updateMainCurrency };
