import Joi from "@/utils/validation/mongoose.validation";


const reviewValidators = {
    user: Joi.ObjectId().required().messages({
        'any.required': 'Please provide user id'
    }),

    dish: Joi.ObjectId().required().messages({
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

    body: Joi.array().items(Joi.string())
};


const createReview = Joi.object(reviewValidators);

const updateReview = Joi.object({
    body: reviewValidators.body,
    rating: reviewValidators.rating.optional()
});


export default {
    createReview,
    updateReview
};
