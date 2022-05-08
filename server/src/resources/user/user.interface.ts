import {Document, Schema} from 'mongoose';
import CurrencyEnum from '@/utils/enums/currency.enum';
import RoleEnum from '@/utils/enums/role.enum';


export interface CartItem {
    dish: Schema.Types.ObjectId;
    quantity: number;
    stock?: number
}

export interface UpdatedCartItem {
    dish: Schema.Types.ObjectId;
    dishName: string;
    category: string;
    cuisine: string;
    type: string;
    unitPrice: number;
    quantity: number;
    currency: CurrencyEnum;
    stock: number;
    image: {
        breakpoints: number[],
        paths: string[]
    };
}

export default interface User extends Document {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    addresses: {
        firstName: string,
        lastName: string,
        phone: string,
        country: string,
        postalCode: string,
        city: string,
        street: string,
        streetNumber: string,
        flatNumber?: string
    }[];
    roles: RoleEnum;
    orders: Schema.Types.ObjectId[];
    cart: CartItem[];
    defaultCurrency: string;
    active: boolean;
    banned: boolean;

    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpirationTimestamp?: Date;

    find(selector: object): void;

    isValidPassword(
        inputPassword:
            string, userPassword: string
    ): Promise<Error | boolean>;

    wasPasswordChangedAfter(
        timestamp: number
    ): boolean;

    createPasswordResetToken(): Promise<string>

    updatePassword(password: string): Promise<void>;

    resetPassword(password: string): Promise<void>;
}