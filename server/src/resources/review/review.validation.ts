import Joi from '@/utils/validation/mongoose.validation';

import sharedValidation from '@/resources/shared/shared.validation';


const reviewBodyValidators = {
    dish: Joi.string().required().messages({
        'any.required': 'Please provide dish id'
    }),

    order: Joi.ObjectId().required().messages({
        'any.required': 'Please provide order id'
    }),

    rating: Joi.number().custom((value, helpers) => {
        if (value >= 0 && value <= 5 && Math.floor(2 * value) == 2 * value) {
            return value;
        }
        return helpers.error('number.invalid');
    }).required().messages({
        'any.required': 'Please provide your rating',
        'number.invalid': 'Rating must be a multiple of 0.5 between 0 and 5'
    }),

    body: Joi.array().items(Joi.string().allow(''))
};


const body = {
    createReview: Joi.object(reviewBodyValidators),

    editReview: Joi.object({
        body: reviewBodyValidators.body,
        rating: reviewBodyValidators.rating.optional()
    })
};

const query = {
    getReviews: Joi.object({
        dishName: Joi.string(),  // Allow multiple values separated by comma
        fields: sharedValidation.fields,
        createdAt: sharedValidation.comparison.date,
        updatedAt: sharedValidation.comparison.date,
        rating: sharedValidation.comparison.number,
        ...sharedValidation.pagination
    }),

    getReview: Joi.object({
        fields: sharedValidation.fields
    })
};


export default {
    body,
    query
};
