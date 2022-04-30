import UserModel from '@/resources/user/user.model';
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
    ): Promise<string | Error> {
        try {
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

            return token.createToken(user);
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        const user = await User.findOne({ email }).select('+password');
        console.log("HERE", user?.password)
        if (user && await user.isValidPassword(password, user.password)) {
            return token.createToken(user);
        } else {
            throw new Error('Wrong credentials given');
        }
    }
}

export default UserService;
