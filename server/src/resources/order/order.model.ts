import { model, Schema } from 'mongoose';

import AppError from '@/utils/errors/app.error';
import currency from '@/utils/currency';

import dishModel from '@/resources/dish/dish.model';
import Order from './interfaces/order.interface';


const orderItem = new Schema(
    {
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
            required: [true, 'DishID is required'],
        },

        dishName: {
            type: String,
            trim: [true, 'Dish name should have no spaces at the beginning and at the end'],
            minlength: [2, 'Dish name should contain at least 2 characters'],
            maxlength: [40, 'Dish name shouldn\'t be longer than 40 characters'],
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
            min: [0, 'Ordered dish Unit Price must be positive']
        },
    },
    {
        _id: false,
        timestamps: false,
        versionKey: false
    }
);

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'UserID is required'],
        },

        items: {
            type: [orderItem],
            required: [true, 'Please provide an array of ordered dishes']
        },

        currency: {
            type: String,
            required: [true, 'Please provide currency code'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        },

        totalPrice: {
            type: Number,
            min: [0, 'Total price must be a non-negative number'],
            required: [true, 'Please provide a total price of the order']
        },
    },

    {
        timestamps: true,
        versionKey: false
    }
);

// Add indexes on the specific fields of the documents
orderSchema.index({ user: 1, 'items.dish': 1 });

orderSchema.pre<Order>('validate', async function (
    next
): Promise<void> {
    if (!this.isModified()) return next();

    const orderCurrency = this.currency;
    let totalPrice = 0;

    for (const item of this.items) {
        const { dish: dishID, quantity } = item;
        const dish = await dishModel.findById(dishID);
        if (!dish) return next(new AppError(404, `Cannot find dish with id ${dishID}`));

        if (quantity > dish.stock) {
            return next(new AppError(400, `Cannot buy ${quantity} units of dish with id ${dishID}. There are only ${dish.stock} units in stock.`));
        }

        item.dishName = dish.name;
        item.unitPrice = await currency.exchangeCurrency(
            dish.unitPrice,
            dish.currency,
            orderCurrency
        );

        totalPrice += item.unitPrice * quantity;
    }

    this.totalPrice = Math.ceil(totalPrice * 100) / 100;

    next();
});


export default model<Order>('Order', orderSchema);
