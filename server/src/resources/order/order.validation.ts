import Joi from 'joi';

import { currencyValidators } from '@/resources/currency/currency.validation';
import sharedValidation from '../shared/shared.validation';


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

        currency: currencyValidators.code
    })
}

const query = {
    getOrders: Joi.object({
        ...sharedValidation.pagination,
        fields: sharedValidation.fields,
        createdAt: sharedValidation.comparison.date,
        totalPrice: sharedValidation.comparison.number,
        currency: currencyValidators.code.optional()
    })
}


export default {
    body,
    query
};
