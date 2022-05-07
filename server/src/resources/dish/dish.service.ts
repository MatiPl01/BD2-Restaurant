import reviewModel from '../review/review.model';
import dishModel from './dish.model';
import AppError from '@/utils/errors/app.error';
import Review from '../review/review.interface';
import Dish from '@/resources/dish/dish.interface';


class DishService {
    private dish = dishModel;
    private review = reviewModel;

    public async getDishes(
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Partial<Dish>[]> {
        return this.dish.find(filters, fields, pagination);
    }

    public async createDish(
        dishData: Dish
    ): Promise<Dish> {
        return await this.dish.create(dishData);
    }

    public async updateDish(
        id: string,
        updatedProps: { [key: string]: number }
    ): Promise<Dish> {
        const updatedDish = await this.dish.findByIdAndUpdate(
            id,
            { $set: updatedProps },
            { new: true }
        );
        if (updatedDish) return updatedDish;

        throw new AppError(400, `Cannot update dish with id ${id}`);
    }

    public async getDish(
        id: string,
        fields: { [key: string]: number }
    ): Promise<Partial<Dish>> {
        let dish;
        if (fields['reviews']) {
            dish = await this.dish.findById(id, fields).populate('reviews');
        } else {
            dish = await this.dish.findById(id, fields);
        }
        if (dish) return dish;
        
        throw new AppError(404, `Cannot get dish with id ${id}`);
    }

    public async deleteDish(
        id: string
    ): Promise<void> {
        const dish = await this.dish.findByIdAndDelete(id);

        if (!dish) throw new AppError(404, `Cannot delete dish with id ${id}`);
    }

    public async getDishReviews(
        id: string,
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
