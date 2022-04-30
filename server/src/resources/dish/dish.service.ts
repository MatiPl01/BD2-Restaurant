import Dish from '@/resources/dish/dish.interface';
import dishModel from './dish.model';

class DishService {
    private dish = dishModel;

    public async getAllDishes(): Promise<Dish[]> {
        try {
            return await this.dish.find()
        } catch (error) {
            throw new Error('Cannot get dishes');
        }
    }

    public async createDish(
        dishData: Dish
    ): Promise<Dish | Error> {
        try {
            return await this.dish.create(dishData);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default DishService;
