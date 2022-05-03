import CurrencyEnum from '@/utils/enums/currency.enum';
import Joi from 'joi';


const createOrder = Joi.object({
    items: Joi.array().items(Joi.object({
        dish: Joi.string().required().messages({
            'any.required': 'DishID is required'
        }),

        dishName: Joi.string().trim().min(2).max(40).required().messages({
            'any.required': 'Dish name is required',
            'string.trim': 'Dish name should have no spaces at the beginning and at the end',
            'string.min': 'Dish name should contain at least 2 characters',
            'string.max': 'Dish name shouldn\'t be longer than 40 characters'
        }),

        quantity: Joi.number().integer().min(1).required().messages({
            'number.min': 'quantity cannot be lower than 1',
            'number.integer': 'Dish quantity should be an integer number',
            'any.required': 'Dish Name is required'
        }),

        unitPrice: Joi.number().min(0).required().messages({
            'number.min': 'Unit Price cannot be lower than 0',
            'any.required': 'Unit Price is required'
        })
    })).messages({
        'any.required': 'Please provide an array of ordered dishes'
    }),

    currency: Joi.string().valid(...Object.values(CurrencyEnum))
});


export default {
    createOrder
};
