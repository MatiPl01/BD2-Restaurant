import { Schema, ClientSession } from 'mongoose';

import { updatePriceFilters } from '@/utils/filters';
import singleTransaction from '@/utils/single-transaction';
import AppError from '@/utils/errors/app.error';
import currency from '@/utils/currency';

import ReviewModel from '@/resources/review/review.model';
import Review from '@/resources/review/review.interface';
import DishModel from './dish.model';
import Dish from './dish.interface';


class DishService {
    private dish = DishModel;
    private review = ReviewModel;

    public getDishes = singleTransaction(async (
        session: ClientSession,
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number },
        targetCurrency?: string
    ): Promise<{ dishes: Partial<Dish>[], matchingCount: number, totalCount: number }> => {
        filters = await updatePriceFilters(filters, targetCurrency, session);
        // TODO - move steps from below to thr factory function or somewhere else

        // Map arrays in filters
        Object.entries(filters).forEach(([key, val]) => {
            if (Array.isArray(val)) {
                filters[key] = { $in: val };
            }
        });
        
        // Handle pagination
        const { skip, limit } = pagination;
        const pipeline: { [key: string]: any }[] = [{ $match: filters }];

        if (skip !== undefined && limit !== undefined) {
            pipeline.push(
                { $skip: skip },
                { $limit: limit }
            );
        }

        if (Object.keys(fields).length) {
            pipeline.push({ $project: fields });
        }

        const aggregated = await this.dish.aggregate([
            {
                $facet: {
                    // @ts-ignore
                    dishes: pipeline,

                    filteredCount: [
                        { $match: filters },
                        { $count: 'value' }
                    ],

                    totalCount: [
                        { $count: 'value' }
                    ]
                }
            }
        ]).session(session);

        if (!aggregated.length) {
            throw new AppError(500, 'Cannot aggregate dishes');
        }

        const result = aggregated[0];
        result.filteredCount = result.filteredCount[0].value;
        result.totalCount = result.totalCount[0].value;

        if (skip !== undefined && limit !== undefined) {
            result.pagesCount = Math.ceil(result.filteredCount / limit);
            result.currentPage = Math.ceil(skip / limit) + 1;
        }
        
        if (targetCurrency) {
            for (const dish of result.dishes) {
                await currency.changeDishCurrency(dish, targetCurrency, undefined, session);
                delete dish.mainUnitPrice;
            }
        }

        return result;
    })

    public async createDish(
        dishData: Dish
    ): Promise<Dish> {
        let { coverIdx } = dishData;
        coverIdx = coverIdx || 0;  // Replace by 0 if the coverIdx was not specified

        delete dishData.coverIdx;
        dishData.coverImage = dishData.images[0];

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


// Create and export dish service singleton instance
export default new DishService();
