import Joi from 'joi';


const register = Joi.object({
    firstName: Joi.string().min(1).max(30).required(),

    lastName: Joi.string().min(1).max(30).required(),

    login: Joi.string().min(3).max(20).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(8).required(),

    address: Joi.array().items(Joi.object({
        firstName: Joi.string().min(1).max(30).required(),
        lastName: Joi.string().min(1).max(30).required(),
        phone: Joi.string().required(), // TODO - maybe improve?
        country: Joi.string().required(),
        postalCode: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        streetNumber: Joi.string().required(),
        flatNumber: Joi.string(),
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
    email: Joi.string().required(), // TODO - implement singing in using email or login

    password: Joi.string().required(),
});


export default { register, login };
