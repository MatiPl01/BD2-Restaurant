import CurrencyEnum from "@/utils/enums/currency.enum";
import Joi from "@/utils/validation/mongoose.validation";


const orderValidators = {
    user: Joi.ObjectId().required().messages({
        'any.required': 'Please provide an user id'
    }),

    dishes: Joi.array().items(Joi.object({
        dish: Joi.ObjectId().required().messages({
            'any.required': 'Please provide a dish id'
        }),

        quantity: Joi.number().integer().min(0).required().messages({
            'any.required': 'Please provide a dish quantity',
            'number.integer': 'Dish quantity should be an integer number',
            'number.min': 'Dish quantity must be positive'
        }),

        unitPrice: Joi.number().min(0).required().messages({
            'any.required': 'Please provide a dish unit price',
            'number.min': 'Unit price cannot be negative'
        })
    })).messages({
        'any.required': 'Please provide an array of ordered dishes'
    }),

    totalPrice: Joi.number().min(0).required().messages({
        'any.required': 'Please provide a total order price',
        'number.min': 'Total price must be a non-negative number'
    }),

    currency: Joi.string().valid(...Object.values(CurrencyEnum))
};


const createOrder = Joi.object(orderValidators);


export default {
    createOrder
};
