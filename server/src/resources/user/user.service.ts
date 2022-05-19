import User, { Address, CartItem, DetailedCartItem } from '@/resources/user/user.interface';
import { Schema } from 'mongoose';
import currencyModel from '../currency/currency.model';
import reviewModel from '@/resources/review/review.model';
import configModel from "@/resources/config/config.model";
import dishModel from '@/resources/dish/dish.model';
import UserModel from '@/resources/user/user.model';
import AppError from '@/utils/errors/app.error';
import currency from '../../utils/currency';
import emailer from '@/utils/emailer';
import Review from '../review/review.interface';
import crypto from 'crypto';
import token from '@/utils/token';
import Dish from '../dish/dish.interface';


class UserService {
    private user = UserModel;
    private dish = dishModel;
    private review = reviewModel;
    private config = configModel;
    private currency = currencyModel;

    public async register(
        firstName: string,
        lastName: string,
        nickName: string,
        email: string,
        password: string,
        addresses: Address[],
        defaultCurrency?: string
    ): Promise<{ token: string, user: User }> {
        // If the default currency was not specified, assign the mainCurrency
        // as the user's default currency
        if (!defaultCurrency) {
            const config = await this.config.findOne();
            if (!config) throw new AppError(500, 'Cannot get config');
            defaultCurrency = config.mainCurrency;
        // Otherwise, check if the currency, that was provided by the user, is correct
        } else {
            const currencies = await this.currency.find();
            if (!currencies.some(c => c.code === defaultCurrency)) {
                throw new AppError(400, 'Wrong currency specified');
            }
        }

        const user = await this.user.create({
            firstName,
            lastName,
            nickName,
            email,
            password,
            addresses,
            roles: ['user'],
            defaultCurrency,
            active: true,
            banned: false
        });

        return {
            token: token.create(user),
            user
        };
    }

    public async login(
        email: string,
        password: string
    ): Promise<{ token: string, user: User }> {
        const user = await this.user.findOne({ email }).select('+password');

        if (user && await user.isValidPassword(password, user.password)) {
            return {
                token: token.create(user),
                user
            };
        }

        throw new AppError(401, 'Wrong credentials given');
    }

    public async deactivateUser(
        id: Schema.Types.ObjectId
    ): Promise<void> {
        await this.user.findByIdAndUpdate(id, { active: false });
    }

    public async getUser(
        id: Schema.Types.ObjectId,
        fields: { [key: string]: number }
    ): Promise<Partial<User>> {
        const user = await this.user.findById(id, fields);
        if (user) return user;

        throw new AppError(404, `Cannot get user with id ${id}`);
    }

    public async deleteUser(
        id: Schema.Types.ObjectId
    ): Promise<void> {
        const user = await this.user.findByIdAndDelete(id);

        if (!user) throw new AppError(404, `Cannot delete user with id ${id}`);
    }

    public async getUsers(
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Partial<User>[]> {
        return this.user.find(filters, fields, pagination);
    }

    public async forgotPassword(
        url: string,
        email: string
    ): Promise<void> {
        const user = await this.user.findOne({ email });

        if (!user) throw new AppError(404, `Cannot find user with email: ${email}`);

        const token = await user.createPasswordResetToken();
        const resetUrl = `${url}/${token}`;
        const tokenExpiresIn = Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN);

        try {
            await emailer.sendMail({
                to: email,
                subject: 'Yummyfood - Password reset token',
                text: `To reset your password, please submit a PATCH request to the url provided below.\n\nPassword reset url:\n${resetUrl}\n\n(Token will expire in ${Math.floor(tokenExpiresIn / 60)} minutes and ${tokenExpiresIn % 60} seconds)`
            });
        } catch (error) {
            user.passwordResetToken = user.passwordResetExpirationTimestamp = undefined;
            await user.save({ validateBeforeSave: false });

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
            passwordResetExpirationTimestamp: { $gt: Date.now() }
        });

        if (!user) throw new AppError(400, 'Token is invalid or has expired');

        await user.resetPassword(newPassword);

        return token.create(user);
    }

    public async updatePassword(
        id: Schema.Types.ObjectId,
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
        id: Schema.Types.ObjectId,
        updatedProps: { [key: string]: any }
    ): Promise<User> {
        const updatedUser = await this.user.findByIdAndUpdate(
            id,
            { $set: updatedProps },
            { new: true }
        );
        if (updatedUser) return updatedUser;

        throw new AppError(400, `Cannot update user with id ${id}`);
    }

    public async getUserReviews(
        id: Schema.Types.ObjectId,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Partial<Review>[]> {
        return this.review.find(
            { user: id, ...filters },
            fields,
            pagination
        );
    }

    public async getUserCart(
        user: User,
        targetCurrency?: string
    ): Promise<DetailedCartItem[]> {
        const detailedCart: DetailedCartItem[] = [];

        for (const cartItem of user.cart) {
            const { dish: dishID, quantity } = cartItem;

            const dish = await dishModel.findById(dishID);
            if (dish) {
                detailedCart.push(await this.createCartItem(
                    dish,
                    quantity,
                    targetCurrency
                ));
            }
        }

        return detailedCart;
    }

    public async setUserCart(
        id: Schema.Types.ObjectId,
        cart: CartItem[]
    ): Promise<CartItem[]> {
        for (let { dish: dishID, quantity } of cart) {
            const dish = await this.dish.findById(dishID);

            if (!dish) throw new AppError(404, `Cannot find dish with id ${dishID}`);

            if (dish.stock < quantity) {
                throw new AppError(400, 'You cannot add more items than in stock');
            }
        }

        const updatedUser = await this.user.findByIdAndUpdate(id, { cart });
        if (!updatedUser) throw new AppError(400, `Unable to update cart for user with id ${id}`);

        return cart; // I don't know why updatedUser.user is still not updated but GET returns the new cart
    }

    private async createCartItem(
        dish: Dish,
        quantity: number,
        targetCurrency?: string
    ): Promise<DetailedCartItem> {
        let unitPrice: number;
        const dishCurrency = dish.currency;

        if (targetCurrency) {
            unitPrice = await currency.exchangeCurrency(
                dish.unitPrice,
                dishCurrency,
                targetCurrency,
                undefined
            );
        } else {
            unitPrice = dish.unitPrice
        }

        const { coverIdx, gallery } = dish.images;
        const { breakpoints, paths } = gallery[coverIdx];

        return {
            dishID: dish.id,
            dishName: dish.name,
            category: dish.category,
            cuisine: dish.cuisine,
            type: dish.type,
            unitPrice,
            quantity,
            stock: dish.stock,
            currency: targetCurrency ? targetCurrency : dishCurrency,
            image: {
                breakpoints,
                paths
            }
        };
    }
}


export default UserService;
