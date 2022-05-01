import UserModel from '@/resources/user/user.model';
import AppError from '@/utils/errors/app.error';
import token from '@/utils/token';
import User from "@/resources/user/user.model";


type Address = {
    firstName: String,
    lastName: String,
    phone: String,
    country: String,
    postalCode: String,
    city: String,
    street: String,
    streetNumber: String,
    flatNumber: String
}


class UserService {
    private user = UserModel;

    public async register(
        firstName: string,
        lastName: string,
        login: string,
        email: string,
        password: string,
        addresses: Address[],
        roles: string[],
        defaultCurrency: string,
        active: boolean = true,
        banned: boolean = false
    ): Promise<{ token: string } | Error> {
        const user = await this.user.create({
            firstName,
            lastName,
            login,
            email,
            password,
            addresses,
            roles,
            defaultCurrency,
            active,
            banned
        });

        return {  token: token.createToken(user) };
    }

    public async login(
        email: string,
        password: string
    ): Promise<{ token: string } | Error> {
        const user = await User.findOne({ email }).select('+password');

        if (user && await user.isValidPassword(password, user.password)) {
            return { token: token.createToken(user) };
        }

        throw new AppError(401, 'Wrong credentials given');
    }
}


export default UserService;
