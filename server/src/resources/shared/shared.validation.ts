import Joi from 'joi';


const comparisonFilter = (
    validator: any
): { [key: string]: any } => {
    return {
        ...Object
        .fromEntries(['lt', 'lte', 'gt', 'gte']
        .map(key => [key, validator]))
    };
}

const comparison = {
    number: comparisonFilter(Joi.number()),
    date: comparisonFilter(Joi.date())
};

const pagination = {
    page: Joi.number().integer().min(1).messages({
        'number.integer': 'Page number must be an integer',
        'number.min': 'Page number should be at least 1'
    }),
    limit: Joi.number().integer().min(1).messages({
        'number.integer': 'Limit number must be an integer',
        'number.min': 'Limit number should be at least 1'
    })
};

const fields = Joi.string().required().messages({
    'any.required': 'Please provide fields to filter'
}).optional();


export default {
    comparison,
    pagination,
    fields
};
