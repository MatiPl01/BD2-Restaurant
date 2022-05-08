import {model, Schema} from 'mongoose';
import CurrencyEnum from '@/utils/enums/currency.enum';
import dishModel from '../dish/dish.model';
import Order from '@/resources/order/order.interface';
import AppError from '@/utils/errors/app.error';


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
            required: [true, 'A currency must have a 3-letter code'],
            enum: {
                values: Object.values(CurrencyEnum),
                message: `Available roles are: ${Object.values(CurrencyEnum).join(', ')}`
            },
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

orderSchema.pre<Order>('validate', async function (
    next
): Promise<void> {
    if (!this.isModified()) return next();

    // Calculate the total price
    this.totalPrice = Math.ceil(this.items.reduce((total, item) => {
        return total + item.quantity * item.unitPrice
    }, 0) * 100) / 100;
    
    for (const item of this.items) {
        const dishID = item.dish;
        const dish = await dishModel.findById(dishID);
        if (!dish) return next(new AppError(404, `Cannot find dish with id ${dishID}`))
        item.dishName = dish.name;
    }
    next();
});


export default model<Order>('Order', orderSchema);
