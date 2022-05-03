import Joi from "@/utils/validation/mongoose.validation";

const createReview = Joi.object({
    user: Joi.ObjectId().required().messages({
        'any.required': 'User id is required'
    }),

    dish: Joi.ObjectId().required().messages({
        'any.required': 'Dish id is required\''
    }),

    order: Joi.ObjectId().required().messages({
        'any.required': 'Order id is required\''
    }),

    rating: Joi.number().custom((value, helpers) => {
        if (value >= 0 && value <= 5 && Math.floor(2 * value) == 2 * value) {
            return value;
        }
        return helpers.error('number.invalid');
    }).required().messages({
        'any.required': 'Rating is required\'',
        'number.invalid': 'Rating must be a multiple of 0.5 between 0 and 5'
    }),

    body: Joi.string().required().messages({
        'any.required': 'Body of review is required'
    })
})

const editReview= Joi.object({
    review: Joi.ObjectId().required().messages({
        'any.required': 'Review id is required'
    }),

    rating: Joi.number().custom((value, helpers) => {
        if (value >= 0 && value <= 5 && Math.floor(2 * value) == 2 * value) {
            return value;
        }
        return helpers.error('number.invalid');
    }).required().messages({
        'any.required': 'Rating is required\'',
        'number.invalid': 'Rating must be a multiple of 0.5 between 0 and 5'
    }),

    body: Joi.string().required().messages({
        'any.required': 'Body of review is required'
    })
})


export default {createReview,editReview};
