import { Schema, model } from 'mongoose';
import Order from '@/resources/order/order.interface';

const orderSubSchema=new Schema({
        dish:{
            type:Schema.Types.ObjectId,
            ref: 'Dish',
            required: [true, 'DishID is required'],
        },
        dishName:{
            type:String,
            required: [true, 'Dish Name is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Dish quantity is required'],
            min: [1, 'Ordered dish quantity must be positive'],
            validate: {
                validator: Number.isInteger,
                message: 'Ordered dish quantity must be an integer'
            }
        },
        unitPrice: {
            type: Number,
            required: [true, 'Dish Unit Price is required'],
            min: [0, 'Ordered dish Unit Price must be positive'],
            validate: {
                validator: Number.isInteger,
                message: 'Ordered dish Unit Price must be an integer'
            }
        }
    },
    {
        timestamps:false,
        versionKey:false,
        _id:false
    }
)

const orderSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'UserID is required'],
        },
        dishes:{
            type:[orderSubSchema],
            required: [true, 'Please provide an array of ordered dishes']
        },
        currency:{
            type:Schema.Types.ObjectId,
            required: [true, 'CurrencyID is required'],
        },
        totalPrice: {
            type: Number,
            min: [0, 'Total price must be a non-negative number'],
            required: [true, 'Please provide a total order price']
        },

    },
    {
        timestamps: true,
        versionKey: false
    }
);


export default model<Order>('Order', orderSchema);
