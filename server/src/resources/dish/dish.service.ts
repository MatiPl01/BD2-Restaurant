import { Schema, ClientSession } from 'mongoose';
import { updatePriceFilters } from '@/utils/filters';
import singleTransaction from '@/utils/single-transaction';
import reviewModel from '../review/review.model';
import dishModel from './dish.model';
import AppError from '@/utils/errors/app.error';
import currency from '@/utils/currency';
import Review from '../review/review.interface';
import Dish from '@/resources/dish/dish.interface';


class DishService {
    private dish = dishModel;
    private review = reviewModel;

    public getDishes = singleTransaction(async (
        session: ClientSession,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number },
        targetCurrency?: string
    ): Promise<Partial<Dish>[]> => {
        filters = await updatePriceFilters(filters, targetCurrency, session);
        
        const dishes = await this.dish.find(
            filters, 
            fields, 
            { ...pagination, session }
        );

        if (targetCurrency) {
            for (const dish of dishes) {
                await currency.changeDishCurrency(dish, targetCurrency, undefined, session);
            }
        }

        return dishes;
    })

    public async createDish(
        dishData: Dish
    ): Promise<Dish> {
        return await this.dish.create(dishData);
    }

    public updateDish = singleTransaction(async (
        session: ClientSession,
        id: Schema.Types.ObjectId,
        updatedProps: { [key: string]: number }
    ): Promise<Dish> => {
        const updatedDish = await this.dish.findByIdAndUpdate(
            id,
            { $set: updatedProps },
            { 
                new: true,
                session
            }
        );
        if (!updatedDish) throw new AppError(400, `Cannot update dish with id ${id}`);
        return await updatedDish.save({ session });
    })

    public getDish = singleTransaction(async (
        session: ClientSession,
        id: Schema.Types.ObjectId,
        fields: { [key: string]: number },
        targetCurrency?: string
    ): Promise<Partial<Dish>> => {
        let dish;
        if (fields['reviews']) {
            dish = await this.dish.findById(id, fields, { session }).populate('reviews');
        } else {
            dish = await this.dish.findById(id, fields, { session });
        }

        if (dish) {
            if (targetCurrency) {
                await currency.changeDishCurrency(dish, targetCurrency, undefined, session);
            }
            return dish;
        }


        throw new AppError(404, `Cannot get dish with id ${id}`);
    })

    public async deleteDish(
        id: Schema.Types.ObjectId
    ): Promise<void> {
        const deletedDish = await this.dish.findByIdAndDelete(id);

        if (!deletedDish) throw new AppError(404, `Cannot delete dish with id ${id}`);
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
