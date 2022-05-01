import Joi from 'joi';


const ObjectId = (message='invalid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)


export default {
    ...Joi,
    ObjectId
}
