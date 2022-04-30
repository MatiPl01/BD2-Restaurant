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
            trim: true,
            minlength: 3,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            select: false
        },
        addresses: [
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
                phone: {
                    type: String,
                    required: true
                },
                country: {
                    type: String,
                    required: true
                },
                postalCode: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                street: {
                    type: String,
                    required: true
                },
                streetNumber: {
                    type: String,
                    required: true
                },
                flatNumber: {
                    type: String
                }
            }
        ],
        roles: {
            type: [String],
            required: true,
            enum: ['user', 'manager', 'admin'],
            default: ['user']
        },
        orders: {
            type: [Schema.Types.ObjectId],
            ref: 'Orders'
        },
        cart: [
            {
                dish: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        defaultCurrency: {
            type: String,
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
    { 
        timestamps: true,
        versionKey: false
    }
);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

UserSchema.methods.isValidPassword = async function (
    inputPassword: string, 
    userPassword: string
): Promise<boolean> {
    return await bcrypt.compare(inputPassword, userPassword);
}

export default model<User>('User', UserSchema);
