import CurrencyEnum from '@/utils/enums/currency.enum';
import RoleEnum from '@/utils/enums/role.enum';
import Joi from 'joi';


const addressValidators = {
    firstName: Joi.string().trim().min(1).max(30).required().messages({
        'any.required': 'Please provide first name',
        'string.trim': 'First name cannot start with and end with spaces',
        'string.min': 'First name should have at least 1 letter',
        'string.max': 'First name shouldn\'t be longer than 30 characters'
    }),

    lastName: Joi.string().trim().min(1).max(30).required().messages({
        'any.required': 'Please provide last name',
        'string.trim': 'Last name cannot start with and end with spaces',
        'string.min': 'Last name should have at least 1 letter',
        'string.max': 'Last name shouldn\'t be longer than 30 characters'
    }),
    // Example phone number: +48123123123 (with Poland country code)
    phone: Joi.string().trim().pattern(/^(\+|00)[1-9][0-9 \-().]{7,32}$/).required().messages({
        'any.required': 'Please provide phone number',
        'string.trim': 'Phone number cannot start with and end with spaces',
        'string.pattern.base': 'Wrong phone number format'
    }),

    country: Joi.string().trim().min(4).max(60).required().messages({
        'any.required': 'Please provide county name',
        'string.trim': 'Country name cannot start with and end with spaces',
        'string.min': 'Country name should have at least 4 letters',
        'string.max': 'Country name must have at most 60 letters'
    }),

    postalCode: Joi.string().trim().min(5).max(10).required().messages({
        'any.required': 'Please provide a postal (zip) code',
        'string.trim': 'Postal code cannot start with and end with spaces',
        'string.min': 'Postal code should have at least 5 characters',
        'string.max': 'Postal code should have at most 10 characters'
    }),

    city: Joi.string().trim().min(1).max(100).required().messages({
        'any.required': 'Please provide a city name',
        'string.trim': 'City cannot start with and end with spaces',
        'string.min': 'City name should be not empty string',
        'string.max': 'City name should be not longer than 100 letters'
    }),

    street: Joi.string().trim().min(1).max(100).required().messages({
        'any.required': 'Please provide a street name',
        'string.trim': 'Street cannot start with and end with spaces',
        'string.min': 'Street name should be not empty string',
        'string.max': 'Street name should be not longer than 100 letters'
    }),

    streetNumber: Joi.string().trim().min(1).max(10).required().messages({
        'any.required': 'Street number is required',
        'string.trim': 'Street number cannot start with and end with spaces',
        'string.min': 'Street number should be not empty string',
        'string.max': 'Street number should be not longer than 10 characters'
    }),

    flatNumber: Joi.string().trim().min(1).max(10).messages({
        'string.trim': 'Flat number cannot start with and end with spaces',
        'string.min': 'Flat number should be not empty string',
        'string.max': 'Flat number should be not longer than 10 characters'
    }),
};

const userValidators = {
    firstName: Joi.string().min(1).max(30).required().messages({
        'any.required': 'Please provide user first name',
        'string.trim': 'User first name cannot start with and end with spaces',
        'string.min': 'User first name should have at least 1 letter',
        'string.max': 'User first name shouldn\'t be longer than 30 characters'
    }),

    lastName: Joi.string().min(1).max(30).required().messages({
        'any.required': 'Please provide user last name',
        'string.trim': 'User last name cannot start with and end with spaces',
        'string.min': 'User last name should have at least 1 letter',
        'string.max': 'User last name shouldn\'t be longer than 30 characters'
    }),

    login: Joi.string().trim().min(3).max(20).required().messages({
        'any.required': 'Please provide user login',
        'string.trim': 'User login cannot have spaces at the beginning and at the end',
        'string.min': 'User login must contain at least 3 characters',
        'string.max': 'User login cannot be longer than 20 characters'
    }),

    email: Joi.string().trim().min(3).max(320).email().required().messages({
        'any.required': 'Please provide user email address',
        'string.lowercase': 'User email address should be lowercase',
        'string.trim': 'User email address cannot have spaces at the beginning and at the end',
        'string.min': 'User email address should contain at least 3 characters',
        'string.max': 'User email address should contain at most 320 characters'
    }),

    password: Joi.string().trim().min(8).max(40).required().messages({
        'any.required': 'Please provide user password',
        'string.trim': 'User password cannot have spaces at the beginning and at the end',
        'string.min': 'User password must contain at least 8 characters',
        'string.max': 'User password must contain at most 40 characters'
    }),

    addresses: {
        defaultIdx: Joi.number().integer().min(0).messages({
            'number.integer': 'Default address index must be an integer number',
            'number.min': 'Default address index should not be lower than 0'
        }),
        list: Joi.array().items(Joi.object(addressValidators)).required()
    },

    roles: Joi.array().items(
        Joi.string().valid(...Object.values(RoleEnum))
    ),

    orders: Joi.array(),

    cart: Joi.array().items(Joi.object({
        dish: Joi.object().required(),

        quantity: Joi.number().integer().min(1).required().messages({
            'any.required': 'Please provide ordered dish quantity',
            'number.min': 'Ordered dish quantity must be positive',
            'number.integer': 'Ordered dish quantity must be an integer'
        })
    })),

    defaultCurrency: Joi.string().valid(...Object.values(CurrencyEnum)),

    active: Joi.bool(),

    banned: Joi.bool()
};

const passwordValidator = Joi.string().trim().min(8).max(40).required();
const passwordMessages = {
    'string.trim': 'User password cannot have spaces at the beginning and at the end',
    'string.min': 'User password must contain at least 8 characters',
    'string.max': 'User password must contain at most 40 characters'
};


const body = {
    register: Joi.object(userValidators),

    login: Joi.object({
        email: userValidators.email,
        password: userValidators.password
    }),

    forgotPassword: Joi.object({
        email: userValidators.email
    }),

    resetPassword: Joi.object({
        newPassword: userValidators.password
    }),

    updatePassword: Joi.object({
        currPassword: passwordValidator.messages({
            'any.required': 'Please provide the current password',
            ...passwordMessages
        }),
        newPassword: passwordValidator.messages({
            'any.required': 'Please provide the new password',
            ...passwordMessages
        })
    }),

    updateUser: Joi.object({
        firstName: userValidators.firstName.optional(),
        lastName: userValidators.lastName.optional(),
        bodyLogin: userValidators.login.optional(),
        email: userValidators.email.optional(),
        defaultCurrency: userValidators.defaultCurrency.optional(),
        addresses: {
            defaultIdx: Joi.number().integer().min(0).messages({
                'number.integer': 'Default address index must be an integer number',
                'number.min': 'Default address index should not be lower than 0'
            }),

            list: Joi.object().pattern(
                // Address index
                Joi.number().integer().min(0),
                // Address fields
                Joi.object(Object.fromEntries(
                    Object.entries(addressValidators).map(entry => [entry[0], entry[1].optional()])
                ))
            )
        }
    })
}


export default {
    body
};
