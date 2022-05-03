import Joi from 'joi';

const createOrder = Joi.object({
    dishes:Joi.array().items(Joi.object({
        dish:Joi.string().required().messages({
            'any.required': 'DishID is required'
        }),
        dishName:Joi.string().required().messages({
            'any.required': 'Dish Name is required'
        }),
        quantity:Joi.number().min(1).required().messages({
            'number.min': 'quantity cannot be lower than 1',
            'any.required': 'Dish Name is required'
        }),
        unitPrice:Joi.number().min(0).required().messages({
            'number.min': 'Unit Price cannot be lower than 0',
            'any.required': 'Unit Price is required'
        })
    })).messages({
        'any.required': 'Please provide an array of ordered dishes'
    }),

    totalPrice: Joi.number().min(0).required().messages({
        'any.required': 'Please provide a total order price',
        'number.min': 'Total price must be a non-negative number'
    }),

    currency:Joi.string().required().messages({
        'any.required': 'CurrencyID is required'
    })
});

export default {createOrder};
