import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';


const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 30
        },
        lastName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 30
        },
        login: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false
        },
        addresses: {
            type: [Schema.Types.ObjectId],
            ref: 'Addresses'
        },
        roles: {
            type: [String],
            required: true,
            enum: ['user', 'manager', 'admin'],
            default: ['user']
        },
        orders: {
            type: [Schema.Types.ObjectId]
        },
        cart: {
            type: [{
                dish: Schema.Types.ObjectId,
                quantity: {
                    type: Number,
                    min: 1
                }
            }]
        },
        defaultCurrency: {
            type: Schema.Types.ObjectId,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        banned: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};


export default model<User>('User', UserSchema);
