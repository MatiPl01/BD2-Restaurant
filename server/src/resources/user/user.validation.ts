import Joi from 'joi';

const register = Joi.object({
    firstname: Joi.string().required(),

    lastname: Joi.string().required(),

    login: Joi.string().max(30).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    adress: Joi.string().required()
});

const login = Joi.object({
    email: Joi.string().required(),

    password: Joi.string().required(),
});

export default { register, login};
