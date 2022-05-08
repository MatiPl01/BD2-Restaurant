import {Schema} from 'mongoose';
import ExchangeRateService from '../exchange-rate/exchange-rate.service';
import CurrencyEnum from '@/utils/enums/currency.enum';
import reviewModel from '../review/review.model';
import dishModel from './dish.model';
import AppError from '@/utils/errors/app.error';
import Review from '../review/review.interface';
import Dish from '@/resources/dish/dish.interface';
import configModel from '../config/config.model';


class DishService {
    private dish = dishModel;
    private review = reviewModel;
    private exchangeRateService = new ExchangeRateService();

    public async getDishes(
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number },
        currency?: CurrencyEnum
    ): Promise<Partial<Dish>[]> {
        let dishes: Dish[] = [];

        if (filters.currency) throw new AppError(400, 'Currency filtering is not allowed');

        if (filters.unitPrice) {
            if (!currency) {
                throw new AppError(400, 'Unit price filtering is not allowed without specified currency');
            }

            const mainUnitPrice: { [key: string]: number } = {};

            if (filters.unitPrice) {
                for (const [key, value] of Object.entries(filters.unitPrice)) {
                    mainUnitPrice[key] = await this.exchangeToMainCurrency(value as number, currency);
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

        if (currency) {
            for (const dish of dishes) await this.changeDishCurrency(dish, currency);
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
        currency?: CurrencyEnum
    ): Promise<Partial<Dish>> {
        let dish;
        if (fields['reviews']) {
            dish = await this.dish.findById(id, fields).populate('reviews');
        } else {
            dish = await this.dish.findById(id, fields);
        }

        if (dish) {
            if (currency) await this.changeDishCurrency(dish, currency);
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

    private async exchangeCurrency(
        amount: number,
        from: CurrencyEnum,
        to: CurrencyEnum,
    ): Promise<number> {
        let rate = 1;
        if (from !== to) {
            rate = (await this.exchangeRateService.getExchangeRate(from, to)).rate;
        }
        return Math.ceil(amount * rate * 100) / 100;
    }

    private async exchangeToMainCurrency(
        amount: number,
        from: CurrencyEnum
    ): Promise<number> {
        const config = await configModel.findOne();
        if (!config) throw new AppError(404, 'Config was not found in the database');

        return await this.exchangeCurrency(amount, from, config.mainCurrency);
    }

    private async changeDishCurrency(
        dish: Dish,
        to: CurrencyEnum
    ): Promise<void> {
        let from: CurrencyEnum;

        if (dish.unitPrice === undefined && dish.currency === undefined) return;
        if (dish.currency === undefined) {
            const dishCurrency = (await this.dish.findById(dish.id))?.currency;
            if (!dishCurrency) throw new AppError(404, `Cannot find dish with id ${dish.id}`);
            from = dishCurrency as CurrencyEnum;
        } else {
            from = dish.currency as CurrencyEnum;
            dish.currency = to;
        }

        if (dish.unitPrice !== undefined) {
            dish.unitPrice = await this.exchangeCurrency(dish.unitPrice, from, to);
        }
    }
}


export default DishService;