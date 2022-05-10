import {Document, Schema} from 'mongoose';
import CurrencyEnum from '@/utils/enums/currency.enum';
import RoleEnum from '@/utils/enums/role.enum';


export type Address = {
    firstName: String,
    lastName: String,
    phone: String,
    country: String,
    postalCode: String,
    city: String,
    street: String,
    streetNumber: String,
    flatNumber?: String
}

export interface CartItem {
    dish: Schema.Types.ObjectId;
    quantity: number;
    stock?: number
}

export interface DetailedCartItem {
    dishID: Schema.Types.ObjectId;
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
    nickName: string;
    email: string;
    password: string;
    addresses: Address[];
    roles: RoleEnum[];
    cart: CartItem[];
    defaultCurrency: CurrencyEnum;
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