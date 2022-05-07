import reviewModel from '@/resources/review/review.model';
import UserModel from '@/resources/user/user.model';
import AppError from '@/utils/errors/app.error';
import emailer from '@/utils/emailer';
import token from '@/utils/token';
import User from '@/resources/user/user.interface';
import crypto from 'crypto';
import Review from '../review/review.interface';


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
    private review = reviewModel;

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
    ): Promise<string> {
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

        return token.create(user);
    }

    public async login(
        email: string,
        password: string
    ): Promise<string> {
        const user = await this.user.findOne({email}).select('+password');

        if (user && await user.isValidPassword(password, user.password)) {
            return token.create(user);
        }

        throw new AppError(401, 'Wrong credentials given');
    }

    public async deactivateUser(
        id: string
    ): Promise<void> {
        await this.user.findByIdAndUpdate(id, {active: false});
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
        const user = await this.user.findByIdAndDelete(id);

        if (!user) throw new AppError(404, `Cannot delete user with id ${id}`);
    }

    public async forgotPassword(
        url: string,
        email: string
    ): Promise<void> {
        const user = await this.user.findOne({email});

        if (!user) throw new AppError(404, `Cannot find user with email: ${email}`);

        const token = await user.createPasswordResetToken();
        const resetUrl = `${url}/${token}`;
        const tokenExpiresIn = Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN);

        try {
            emailer.sendMail({
                to: email,
                subject: 'Yummyfood - Password reset token',
                text: `To reset your password, please submit a PATCH request to the url provided below.\n\nPassword reset url:\n${resetUrl}\n\n(Token will expire in ${Math.floor(tokenExpiresIn / 60)} minutes and ${tokenExpiresIn % 60} seconds)`
            });
        } catch (error) {
            user.passwordResetToken = user.passwordResetExpirationTimestamp = undefined;
            await user.save({validateBeforeSave: false});

            throw new AppError(500, 'There was an error sending the email. Try again later!');
        }
    }

    public async resetPassword(
        resetToken: string,
        newPassword: string
    ): Promise<string> {
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpirationTimestamp: {$gt: Date.now()}
        });

        if (!user) throw new AppError(400, 'Token is invalid or has expired');

        await user.resetPassword(newPassword);

        return token.create(user);
    }

    public async updatePassword(
        id: string,
        currPassword: string,
        newPassword: string
    ): Promise<string> {
        const user = await this.user.findById(id).select('+password');

        if (!user) {
            throw new AppError(400, `There is no user with id: ${id}`);
        }
        if (!await user.isValidPassword(currPassword, user.password)) {
            throw new AppError(400, 'Current password is not valid');
        }

        await user.updatePassword(newPassword);

        return token.create(user);
    }

    public async updateUser(
        id: string,
        updatedProps: { [key: string]: number }
    ): Promise<User> {
        const updatedUser = await this.user.findByIdAndUpdate(
            id,
            {$set: updatedProps},
            {new: true}
        );
        if (updatedUser) return updatedUser;

        throw new AppError(400, `Cannot update user with id ${id}`);
    }

    public async getUserReviews(
        id: string,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Partial<Review>[]> {
        return await this.review.find(
            {user: id, ...filters},
            fields,
            pagination
        );
    }
}


export default UserService;
