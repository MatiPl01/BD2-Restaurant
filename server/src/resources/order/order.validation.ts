import CurrencyEnum from '@/utils/enums/currency.enum';
import Joi from 'joi';


const body = {
    createOrder: Joi.object({
        items: Joi.array().items(Joi.object({
            dish: Joi.string().required().messages({
                'any.required': 'DishID is required'
            }),

            quantity: Joi.number().integer().min(1).required().messages({
                'number.min': 'quantity cannot be lower than 1',
                'number.integer': 'Dish quantity should be an integer number',
                'any.required': 'Dish Name is required'
            })
        })).messages({
            'any.required': 'Please provide an array of ordered dishes'
        }),

        currency: Joi.string().valid(...Object.values(CurrencyEnum))
    })
}


export default {
    body
};
