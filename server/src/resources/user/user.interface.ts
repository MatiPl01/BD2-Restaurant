import RoleEnum from '@/utils/enums/role.enum';
import {Document, Schema} from 'mongoose';


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
    cart: {
        dish: Schema.Types.ObjectId,
        quantity: number
    };
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
