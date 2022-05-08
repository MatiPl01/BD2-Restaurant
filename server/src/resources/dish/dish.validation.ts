import Joi from "@/utils/validation/mongoose.validation";


const bodyDishValidators = {
    name: Joi.string().trim().min(2).max(40).required().messages({
        'any.required': 'Please provide a dish name',
        'string.trim': 'Dish name should have no spaces at the beginning and at the end',
        'string.min': 'Dish name should contain at least 2 characters',
        'string.max': 'Dish name shouldn\'t be longer than 40 characters'
    }),

    category: Joi.string().trim().lowercase().min(2).max(25).required().messages({
        'any.required': 'Please provide a dish category',
        'string.trim': 'Dish category should have no spaces at the beginning and at the end',
        'string.lowercase': 'Dish category should be lowercase',
        'string.min': 'Dish category should contain at least 2 characters',
        'string.max': 'Dish category should contain at most 25 characters'
    }),

    cuisine: Joi.string().trim().lowercase().min(2).max(15).messages({
        'string.trim': 'Dish cuisine should have no spaces at the beginning and at the end',
        'string.lowercase': 'Dish cuisine should be lowercase',
        'string.min': 'Dish cuisine should contain at least 2 characters',
        'string.max': 'Dish cuisine should contain at most 15 characters'
    }),

    type: Joi.string().trim().lowercase().min(2).max(15).messages({
        'string.trim': 'Dish type should have no spaces at the beginning and at the end',
        'string.lowercase': 'Dish type should be lowercase',
        'string.min': 'Dish type should contain at least 2 characters',
        'string.max': 'Dish type should contain at most 15 characters'
    }),

    ingredients: Joi.array().items(
        Joi.string().min(1).messages({
            'string.min': 'Dish ingredient should be not empty string'
        })
    ).required().messages({
        'any.required': 'Please provide dish ingredients'
    }),

    stock: Joi.number().integer().min(0).messages({
        'number.integer': 'Dish stock must be an integer number',
        'number.min': 'Dish stock should not be lower than 0'
    }),

    currency: Joi.string().uppercase().length(3).required().messages({
        'any.required': 'Please provide a dish price currency',
        'string.uppercase': 'Currency must be an uppercase 3-letter currency code',
        'string.length': 'Currency code must have exactly 3 letters'
    }),

    unitPrice: Joi.number().min(0).required().messages({
        'any.required': 'Please provide a dish unit price',
        'number.min': 'Dish price should be not lower than 0'
    }),

    ratingsAverage: Joi.number().min(0).max(5).messages({
        'number.min': 'Dish ratings average should be not lower than 0',
        'number.max': 'Dish ratings average should be not greater than 5'
    }),

    ratingsCount: Joi.number().min(0).messages({
        'number.min': 'Number of dish reviews cannot be lower than 0'
    }),

    description: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Please provide dish description'
    }),

    images: Joi.object({
        coverIdx: Joi.number().integer().min(0).messages({
            'number.integer': 'Cover index must be an integer number',
            'number.min': 'Cover index cannot be lower than 0'
        }),

        gallery: Joi.array().items(Joi.object(
            {
                breakpoints: Joi.array().items(
                    Joi.number().min(0).required().messages({
                        'any.required': 'Please provide dish image breakpoint',
                        'number.min': 'Dish image breakpoint should not be lower than 0'
                    })
                ).required().messages({
                    'any.required': 'Please provide dish images breakpoints'
                }),

                paths: Joi.array().items(
                    Joi.string().trim().required().messages({
                        'any.required': 'Please provide dish image path',
                        'string.trim': 'Dish image path must have no spaces at the beginning ans ath the end'
                    })
                ).required().messages({
                    'any.required': 'Please provide dish images paths'
                })
            }
        ).required().messages({
            'any.required': 'Please provide dish images gallery'
        }))
    })
};


const bodyCreateDish = Joi.object(bodyDishValidators);

const bodyUpdateDish = Joi.object({
    name: bodyDishValidators.name.optional(),
    category: bodyDishValidators.category.optional(),
    cuisine: bodyDishValidators.cuisine.optional(),
    type: bodyDishValidators.type.optional(),
    ingredients: bodyDishValidators.ingredients.optional(),
    stock: bodyDishValidators.stock.optional(),
    currency: bodyDishValidators.currency.optional(),
    unitPrice: bodyDishValidators.unitPrice.optional(),
    description: bodyDishValidators.description.optional(),
    images: Joi.object({
        coverIdx: Joi.number().integer().min(0).messages({
            'number.integer': 'Cover index must be an integer number',
            'number.min': 'Cover index cannot be lower than 0'
        }),

        gallery: Joi.object().pattern(
            // Gallery index
            Joi.number().integer().min(0),
            // Galery value
            Joi.object({
                breakpoints: Joi.object().pattern(
                    // Breakpoint index
                    Joi.number().integer().min(0),
                    // Breakpoint value
                    Joi.number().min(0)
                ),

                paths: Joi.object().pattern(
                    // Path index
                    Joi.number().integer().min(0),
                    // Path string
                    Joi.string().trim()
                )
            })
        )
    })
});

const bodyGetDish = Joi.object({
    currency: bodyDishValidators.currency.optional()
});


export default {
    bodyCreateDish,
    bodyUpdateDish,
    bodyGetDish
};
