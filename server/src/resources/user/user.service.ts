import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = UserModel;

    public async register(
        firstName: string,
        lastName: string,
        login: string,
        email: string,
        password: string,
        roles: string[],
        address: string,
        active: boolean,
        banned: boolean
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                firstName,
                lastName,
                login,
                email,
                password,
                roles,
                address,
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
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to login user');
        }
    }
}

export default UserService;
