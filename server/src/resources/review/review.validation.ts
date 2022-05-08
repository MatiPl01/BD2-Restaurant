import Joi from "@/utils/validation/mongoose.validation";


const reviewValidators = {
    dish: Joi.string().required().messages({
        'any.required': 'Please provide dish id'
    }),

    dishName: Joi.string().trim().min(2).max(40).required().messages({
        'any.required': 'Dish name is required',
        'string.trim': 'Dish name should have no spaces at the beginning and at the end',
        'string.min': 'Dish name should contain at least 2 characters',
        'string.max': 'Dish name shouldn\'t be longer than 40 characters'
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


const bodyCreateReview = Joi.object(reviewValidators);

const bodyEditReview = Joi.object({
    body: reviewValidators.body,
    rating: reviewValidators.rating.optional()
});


export default {
    bodyCreateReview,
    bodyEditReview
};