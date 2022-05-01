import Joi from 'joi';


const register = Joi.object({
    firstName: Joi.string().min(1).max(30).required(),

    lastName: Joi.string().min(1).max(30).required(),

    login: Joi.string().trim().min(3).max(20).required(),

    email: Joi.string().trim().min(3).max(320).email().required(),

    password: Joi.string().trim().min(8).max(40).required(),

    address: Joi.array().items(Joi.object({
        firstName: Joi.string().trim().min(1).max(30).required(),

        lastName: Joi.string().trim().min(1).max(30).required(),
        // Example phone number: +48123123123 (with Poland country code)
        phone: Joi.string().trim().pattern(/^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/).required(),

        country: Joi.string().trim().min(4).max(60).required(),

        postalCode: Joi.string().trim().min(5).max(10).required(),

        city: Joi.string().trim().min(1).max(100).required(),

        street: Joi.string().trim().min(1).max(100).required(),

        streetNumber: Joi.string().trim().min(1).max(10).required(),

        flatNumber: Joi.string().trim().min(1).max(10),
    })).required(),

    roles: Joi.array().items(Joi.string().valid('user', 'manager', 'admin')),

    orders: Joi.array(),

    cart: Joi.array().items(Joi.object({
        dish: Joi.object().required(),

        quantity: Joi.number().min(1).required()
    })),

    defaultCurrency: Joi.string(),

    active: Joi.bool(),

    banned: Joi.bool()
});

const login = Joi.object({
    // TODO - implement singing in using email or login
    email: Joi.string().trim().min(3).max(320).email().required(),

    password: Joi.string().trim().min(8).max(40).required(),
});


export default { register, login };
