import {Schema} from 'mongoose';
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
        let dishes: Dish[] = [];

        if (filters.currency) throw new AppError(400, 'Currency filtering is not allowed');

        if (filters.unitPrice) {
            if (!targetCurrency) {
                throw new AppError(400, 'Unit price filtering is not allowed without specified currency');
            }

            const mainUnitPrice: { [key: string]: number } = {};

            if (filters.unitPrice) {
                for (const [key, value] of Object.entries(filters.unitPrice)) {
                    mainUnitPrice[key] = await currency.exchangeToMainCurrency(value as number, targetCurrency);
                }
            }

            const updatedFilters: { [key: string]: object } = {
                ...filters,
                mainUnitPrice
            }
            delete updatedFilters.unitPrice;

            dishes = await this.dish.find(updatedFilters, fields, pagination);
        } else {
            dishes = await this.dish.find(filters, fields, pagination);
        }

        if (targetCurrency) {
            for (const dish of dishes) await currency.changeDishCurrency(dish, targetCurrency);
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
        const dish = await this.dish.findById(id);
        // The line below forces dish model to run 'save' middleware
        if (dish) {
            if (updatedProps.currency || updatedProps.unitPrice !== undefined) {
                await dish.update({$set: updatedProps}, {new: true});
                await dish.updateMainUnitPrice();
                await dish.save();
            }

            return dish;
        }

        throw new AppError(400, `Cannot update dish with id ${id}`);
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
            if (targetCurrency) await currency.changeDishCurrency(dish, targetCurrency);
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
            {dish: id, ...filters},
            fields,
            pagination
        );
    }
}


export default DishService;
