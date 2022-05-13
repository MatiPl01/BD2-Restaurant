import { updateFiltersCurrency } from '@/utils/filters';
import { Schema, connection } from 'mongoose';
import CurrencyEnum from '@/utils/enums/currency.enum';
import reviewModel from '../review/review.model';
import dishModel from './dish.model';
import AppError from '@/utils/errors/app.error';
import currency from '@/utils/currency';
import Review from '../review/review.interface';
import Dish from '@/resources/dish/dish.interface';


class DishService {
    private dish = dishModel;
    private review = reviewModel;

    public async getDishes(
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number },
        targetCurrency?: CurrencyEnum
    ): Promise<Partial<Dish>[]> {
        filters = await updateFiltersCurrency(filters, targetCurrency);
        const dishes = await this.dish.find(filters, fields, pagination);

        if (targetCurrency) {
            for (const dish of dishes) {
                await currency.changeDishCurrency(dish, targetCurrency);
            }
        }

        return dishes;
    }

    public async createDish(
        dishData: Dish
    ): Promise<Dish> {
        return await this.dish.create(dishData);
    }

    public async updateDish(
        id: Schema.Types.ObjectId,
        updatedProps: { [key: string]: number }
    ): Promise<Dish> {
        const session = await connection.startSession();

        try {
            session.startTransaction();
            const updatedDish = await this.dish.findByIdAndUpdate(
                id,
                { $set: updatedProps },
                {
                    session,
                    new: true
                }
            );
            if (!updatedDish) throw new AppError(400, `Cannot update dish with id ${id}`);
            await updatedDish.save({ session });
            await session.commitTransaction();
            return updatedDish;
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            await session.endSession();
        }
    }

    public async getDish(
        id: Schema.Types.ObjectId,
        fields: { [key: string]: number },
        targetCurrency?: CurrencyEnum
    ): Promise<Partial<Dish>> {
        let dish;
        if (fields['reviews']) {
            dish = await this.dish.findById(id, fields).populate('reviews');
        } else {
            dish = await this.dish.findById(id, fields);
        }

        if (dish) {
            if (targetCurrency) {
                await currency.changeDishCurrency(dish, targetCurrency);
            }
            return dish;
        }


        throw new AppError(404, `Cannot get dish with id ${id}`);
    }

    public async deleteDish(
        id: Schema.Types.ObjectId
    ): Promise<void> {
        const dish = await this.dish.findByIdAndDelete(id);

        if (!dish) throw new AppError(404, `Cannot delete dish with id ${id}`);
    }

    public async getDishReviews(
        id: Schema.Types.ObjectId,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Partial<Review>[]> {
        return this.review.find(
            { dish: id, ...filters },
            fields,
            pagination
        );
    }
}


export default DishService;
