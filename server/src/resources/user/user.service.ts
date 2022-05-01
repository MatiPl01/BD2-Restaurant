import UserModel from '@/resources/user/user.model';
import AppError from '@/utils/errors/app.error';
import token from '@/utils/token';
import User from '@/resources/user/user.interface';


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
    ): Promise<{ token: string }> {
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

        return { token: token.createToken(user) };
    }

    public async login(
        email: string,
        password: string
    ): Promise<{ token: string }> {
        const user = await this.user.findOne({ email }).select('+password');

        if (user && await user.isValidPassword(password, user.password)) {
            return { token: token.createToken(user) };
        }

        throw new AppError(401, 'Wrong credentials given');
    }

    public async deactivateUser(
        id: string
    ): Promise<void> {
        await this.user.findByIdAndUpdate(id, { active: false });
    }

    public async getUser(
        id: string,
        fields: { [key: string]: number }
    ): Promise<Partial<User>> {
        const user = await this.user.findById(id, fields);
        if (user) return user;

        throw new AppError(404, `Cannot get user with id ${id}`);
    }

    public async deleteUser(
        id: string
    ): Promise<void> {
        await this.user.deleteOne({ _id: id });
    }
}


export default UserService;
