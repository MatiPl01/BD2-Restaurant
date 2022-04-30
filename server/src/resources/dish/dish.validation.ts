import Joi from "@/utils/validation/mongoose.validation";


const dishValidation = {
    name: Joi.string().trim().min(1).max(40).required(),
    category: Joi.string().trim().lowercase().min(1).max(15),
    cuisine: Joi.string().trim().lowercase().min(1).max(15),
    type: Joi.string().trim().lowercase().min(1).max(15),
    ingredients: Joi.array().items(Joi.string().min(1)).required(),
    stock: Joi.number().integer().min(0),
    currency: Joi.string().uppercase().length(3).required(),
    unitPrice: Joi.number().min(0).required(),
    ratingsAverage: Joi.number().min(0).max(5),
    ratingsCount: Joi.number().min(0),
    description: Joi.array().items(Joi.string()).required(),
    images: Joi.object({
        coverIdx: Joi.number().min(0).required(),
        gallery: Joi.array().items(Joi.object({
            breakpoints: Joi.array().items(Joi.number().min(0).required()).required(),
            paths: Joi.array().items(Joi.string().trim().required()).required()
        }))
    }),
    reviews: Joi.array().items(Joi.ObjectId())
};

const partialDishValidation = { // TODO - improve changing required fields to optional
    ...dishValidation,
    name: Joi.string().trim().min(1).max(40),
    unitPrice: Joi.number().min(0),
    ingredients: Joi.array().items(Joi.string().min(1)),
    description: Joi.array().items(Joi.string()),
    currency: Joi.string().uppercase().length(3),
    images: Joi.object({
        coverIdx: Joi.number().min(0),
        gallery: Joi.array().items(Joi.object({
            breakpoints: Joi.array().items(Joi.number().min(0)),
            paths: Joi.array().items(Joi.string().trim())
        }))
    }),
};

const createDish = Joi.object(dishValidation);
const updateDish = Joi.object(partialDishValidation);

export default { createDish, updateDish };
