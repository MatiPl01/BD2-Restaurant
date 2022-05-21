import { Document, Schema } from 'mongoose';

import RoleEnum from '@/utils/enums/role.enum';

import { Address } from '@/resources/user/types/address.type';
import CartItem from './cart-item.interface';


export default interface User extends Document {
    _id: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    password: string;
    addresses: Address[];
    roles: RoleEnum[];
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
