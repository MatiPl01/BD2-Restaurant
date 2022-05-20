import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import AppError from '@/utils/errors/app.error';
import RoleEnum from '@/utils/enums/role.enum';

import configModel from '@/resources/config/config.model';
import User from './user.interface';


const userCartSchema = new Schema(
    {
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
            required: [true, 'Please provide dish ID']
        },

        quantity: {
            type: Number,
            required: [true, 'Please provide ordered dish quantity'],
            min: [1, 'Ordered dish quantity must be positive'],
            validate: {
                validator: Number.isInteger,
                message: 'Ordered dish quantity must be an integer'
            }
        }
    },
    {
        _id: false
    }
)

const userAddressSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide first name'],
            trim: [true, 'First name cannot start with and end with spaces'],
            minlength: [1, 'First name should have at least 1 letter'],
            maxlength: [30, 'First name shouldn\'t be longer than 30 characters']
        },

        lastName: {
            type: String,
            required: [true, 'Please provide last name'],
            trim: [true, 'Last name cannot start with and end with spaces'],
            minlength: [1, 'Last name should have at least 1 letter'],
            maxlength: [30, 'Last name shouldn\'t be longer than 30 characters']
        },

        phone: {
            type: String,
            required: [true, 'Please provide phone number'],
            trim: [true, 'Phone number cannot start with and end with spaces'],
            validate: {
                validator: (phone: string) => /^(\+|00)[1-9][0-9 \-().]{7,32}$/.test(phone),
                message: 'Wrong phone number format'
            }
        },

        country: {
            type: String,
            required: [true, 'Please provide county name'],
            trim: [true, 'Country name cannot start with and end with spaces'],
            minlength: [4, 'Country name should have at least 4 letters'],
            maxlength: [60, 'Country name must have at most 60 letters']
        },

        postalCode: {
            type: String,
            required: [true, 'Please provide a postal (zip) code'],
            trim: [true, 'Postal code cannot start with and end with spaces'],
            minlength: [5, 'Postal code should have at least 5 characters'],
            maxlength: [10, 'Postal code should have at most 10 characters']
        },

        city: {
            type: String,
            required: [true, 'Please provide a city name'],
            trim: [true, 'City cannot start with and end with spaces'],
            minlength: [1, 'City name should be not empty string'],
            maxlength: [100, 'City name should be not longer than 100 letters'],
        },

        street: {
            type: String,
            required: [true, 'Please provide a street name'],
            trim: [true, 'Street cannot start with and end with spaces'],
            minlength: [1, 'Street name should be not empty string'],
            maxlength: [100, 'Street name should be not longer than 100 letters'],
        },

        streetNumber: {
            type: String,
            required: [true, 'Street number is required'],
            trim: [true, 'Street number cannot start with and end with spaces'],
            minlength: [1, 'Street number should be not empty string'],
            maxlength: [10, 'Street number should be not longer than 10 characters'],
        },

        flatNumber: {
            type: String,
            trim: [true, 'Flat number cannot start with and end with spaces'],
            minlength: [1, 'Flat number should be not empty string'],
            maxlength: [10, 'Flat number should be not longer than 10 characters'],
        },
    },
    {
        _id: false
    }
)

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide user first name'],
            trim: [true, 'User first name cannot start with and end with spaces'],
            minlength: [1, 'User first name should have at least 1 letter'],
            maxlength: [30, 'User first name shouldn\'t be longer than 30 characters']
        },

        lastName: {
            type: String,
            required: [true, 'Please provide user last name'],
            trim: [true, 'User last name cannot start with and end with spaces'],
            minlength: [1, 'User last name should have at least 1 letter'],
            maxlength: [30, 'User last name shouldn\'t be longer than 30 characters']
        },

        nickName: {
            type: String,
            required: [true, 'Please provide user nick name'],
            unique: [true, 'User nick name is already in use'],
            trim: [true, 'User nick name cannot have spaces at the beginning and at the end'],
            minlength: [3, 'User nick name must contain at least 3 characters'],
            maxlength: [20, 'User nick name cannot be longer than 20 characters']
        },

        email: {
            type: String,
            required: [true, 'Please provide user email address'],
            unique: [true, 'User email address is already in use'],
            lowercase: [true, 'User email address should be lowercase'],
            trim: [true, 'User email address cannot have spaces at the beginning and at the end'],
            minlength: [3, 'User email address should contain at least 3 characters'],
            maxlength: [320, 'User email address should contain at most 320 characters']
        },

        // @ts-ignore
        password: {
            type: String,
            required: [true, 'Please provide user password'],
            trim: [true, 'User password cannot have spaces at the beginning and at the end'],
            minlength: [8, 'User password must contain at least 8 characters'],
            maxlength: [40, 'User password must contain at most 40 characters'],
            select: false
        },

        addresses: {
            defaultIdx: {
                type: Number,
                default: 0,
                min: [0, 'Default address index should not be lower than 0'],
                validate: {
                    validator: Number.isInteger,
                    message: 'Default address index must be an integer number'
                }
            },

            list: [userAddressSchema]
        },

        roles: {
            type: [String],
            required: true,
            enum: {
                values: Object.values(RoleEnum),
                message: `Available roles are: ${Object.values(RoleEnum).join(', ')}`
            },
            default: [RoleEnum.USER]
        },

        cart: {
            type: [userCartSchema],
            default: []
        },

        defaultCurrency: {
            type: String,
            required: [true, 'Please provide currency code'],
            unique: [true, 'Currency code must be unique'],
            trim: [true, 'Currency code cannot start with and end with spaces'],
            length: [3, 'Currency code must contain 3 letters'],
            uppercase: [true, 'Currency code must be uppercase']
        },

        active: {
            type: Boolean,
            default: true
        },

        banned: {
            type: Boolean,
            default: false
        },

        passwordChangedAt: {
            type: Date,
            select: false
        },

        passwordResetToken: {
            type: String,
            length: 32,
            select: false
        },

        passwordResetExpirationTimestamp: {
            type: Number,
            select: false
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
);


userSchema.pre<User>('validate', async function (
    next
): Promise<void> {
    if (!this.defaultCurrency) {
        const config = await configModel.findOne();
        if (!config || !config.mainCurrency) {
            return next(new AppError(404, 'Cannot get main currency from the config'));
        }

        this.defaultCurrency = config.mainCurrency;
    }
    next();
});

userSchema.pre<User>('save', async function (
    next
): Promise<void> {
    console.log(this.isModified(), this.isModified('password'));
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.pre<User>(/^find/, function (
    next
): void {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.isValidPassword = async function (
    inputPassword: string,
    userPassword: string
): Promise<boolean> {
    return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.wasPasswordChangedAfter = function (
    timestamp: number
): boolean {
    if (this.passwordChangedAt) {
        const passwordResetExpirationTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
        return passwordResetExpirationTimestamp > timestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = async function (): Promise<string> {
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save hashed reset token in the user model
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');


    // Calculate and save token expiration date
    const { PASSWORD_RESET_TOKEN_EXPIRES_IN } = process.env;
    const exp = ((PASSWORD_RESET_TOKEN_EXPIRES_IN || 10) as number);
    this.passwordResetExpirationTimestamp = Date.now() + exp * 1000;

    // Save the user model
    this.save({ validateBeforeSave: false });

    return resetToken;
};

userSchema.methods.updatePassword = async function (
    password: string,
    saveUser: boolean = true
): Promise<void> {
    this.password = password;
    this.passwordChangedAt = new Date();
    if (saveUser) await this.save();
};

userSchema.methods.resetPassword = async function (
    password: string
): Promise<void> {
    this.updatePassword(password, false);
    this.passwordResetToken = undefined;
    this.passwordResetExpirationTimestamp = undefined;
    await this.save();
};


export default model<User>('User', userSchema);
