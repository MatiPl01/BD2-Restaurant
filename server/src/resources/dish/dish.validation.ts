import Joi from "@/utils/validation/mongoose.validation";

const createDish = Joi.object({
    name: Joi.string().trim().min(1).max(40).required(),
    category: Joi.string().trim().lowercase().min(1).max(15),
    cuisine: Joi.string().trim().lowercase().min(1).max(15),
    type: Joi.string().trim().lowercase().min(1).max(15),
    ingredients: Joi.array().items(Joi.string().min(1)),
    stock: Joi.number().integer().min(0),
    currency: Joi.string().uppercase().length(3),
    unitPrice: Joi.number().min(0).required(),
    ratingsSum: Joi.number().min(0),
    ratingsCount: Joi.number().min(0),
    description: Joi.array().items(Joi.string()).required(),
    images: Joi.object({
        coverIdx: Joi.number().min(0).required(),
        gallery: Joi.array().items(Joi.object({
            breakpoints: Joi.array().items(Joi.number().min(0).required()).required(),
            paths: Joi.array().items(Joi.string().trim().required()).required()
        })).required()
    }).required(),
    reviews: Joi.array().items(Joi.ObjectId())
});

export default { createDish };
