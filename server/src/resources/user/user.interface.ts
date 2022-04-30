import { Document, Schema } from 'mongoose';

export default interface User extends Document {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    // To do in Diagram
    roles: string;
    // address: object<Address>
    address: string;
    active: boolean;
    banned: boolean;
    orders: Schema.Types.ObjectId[];
    // cart: object<Cart>
    cart: string

    isValidPassword(inputPassword: string, userPassword: string): Promise<Error | boolean>;
}
