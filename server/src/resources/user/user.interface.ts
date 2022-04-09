import { Document,Schema} from 'mongoose';

export default interface User extends Document {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    //To do in Diagram
    role: string;
    // address: object<Adres>
    address: string;
    active: boolean;
    banned: boolean;
    orders: Schema.Types.ObjectId[];
    // cart: object<Cart>
    cart:string


    isValidPassword(password: string): Promise<Error | boolean>;
}
