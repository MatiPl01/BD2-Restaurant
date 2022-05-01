import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';
import RolesEnum from '@/utils/enums/roles.enum';


const UserSchema = new Schema(
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

        login: {
            type: String,
            required: [true, 'Please provide user login'],
            unique: [true, 'User login is already in use'],
            trim: [true, 'User login cannot have spaces at the beginning and at the end'],
            minlength: [3, 'User login must contain at least 3 characters'],
            maxlength: [20, 'User login cannot be longer than 20 characters']
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

        passwordChangedAt: {
            type: Date
        },

        addresses: [
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
                        validator: (phone: string) => /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/.test(phone),
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
                }
            }
        ],

        roles: {
            type: [String],
            required: true,
            enum: {
                values: Object.values(RolesEnum),
                message: `Available roles are: ${Object.values(RolesEnum).join(', ')}`
            },
            default: [RolesEnum.USER]
        },

        orders: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Orders'
                }
            ],
        },

        cart: [
            {
                dish: {
                    type: Schema.Types.ObjectId,
                    ref: 'Dishes',
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
            }
        ],

        defaultCurrency: {
            type: String,
            default: 'PLN',
            length: [3, 'User default currency code should have exactly 3 letters'],
            uppercase: [true, 'User default currency code should be uppercase']
        },

        active: {
            type: Boolean,
            default: true
        },
        
        banned: {
            type: Boolean,
            default: false
        }
    },

    { 
        timestamps: true,
        versionKey: false
    }
);

UserSchema.pre<User>('save', async function (
    next
): Promise<void> {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isValidPassword = async function (
    inputPassword: string, 
    userPassword: string
): Promise<boolean> {
    return await bcrypt.compare(inputPassword, userPassword);
}

UserSchema.methods.wasPasswordChangedAfter = function (
    timestamp: number
): boolean {
    if (this.passwordChangedAt) {
        const passwordChangedAtTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
        return passwordChangedAtTimestamp > timestamp;
    }
    return false;
}


export default model<User>('User', UserSchema);
