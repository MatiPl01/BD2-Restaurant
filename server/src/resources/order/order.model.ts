import { Schema, model } from 'mongoose';
import Order from '@/resources/order/order.interface';
import CurrencyEnum from '@/utils/enums/currency.enum';


const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide an user id']
        },

        dishes: {
            type: [
                {
                    dish: {
                        type: Schema.Types.ObjectId,
                        ref: 'Dish',
                        required: [true, 'Please provide a dish id']
                    },

                    quantity: {
                        type: Number,
                        required: [true, 'Please provide a dish quantity'],
                        min: [1, 'Dish quantity must be positive'],
                        validate: {
                            validator: Number.isInteger,
                            message: 'Dish quantity should be an integer number'
                        }
                    },

                    unitPrice: {
                        type: Number,
                        min: [0, 'Unit price cannot be negative'],
                        required: [true, 'Please provide a dish unit price']
                    }
                }
            ],
            required: [true, 'Please provide an array of ordered dishes']
        },

        date: {
            type: Date,
            default: Date.now
        },

        totalPrice: {
            type: Number,
            min: [0, 'Total price must be a non-negative number'],
            required: [true, 'Please provide a total order price']
        },

        currency: {
            type: String,
            required: [true, 'A currency must have a 3-letter code'],
            enum: {
                values: Object.values(CurrencyEnum),
                message: `Available roles are: ${Object.values(CurrencyEnum).join(', ')}`
            },
        }
    },
    
    {
        versionKey: false
    }
);


export default model<Order>('Order', orderSchema);
