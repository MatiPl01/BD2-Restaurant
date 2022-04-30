import Dish from '@/resources/dish/dish.interface';
import dishModel from './dish.model';


class DishService {
    private dish = dishModel;

    public async getDishes(
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Dish[]> {
        try {
            return await this.dish.find(filters, fields, pagination);
        } catch (error) {
            throw new Error('Cannot get dishes');
        }
    }

    public async createDish(
        dishData: Dish
    ): Promise<Dish> {
        try {
            return await this.dish.create(dishData);
        } catch (error: any) {
            throw new Error('Cannot create a dish');
        }
    }

    public async updateDish( // TODO - improve error handling
        id: string,
        updatedProps: { [key: string]: number }
    ): Promise<Dish> {
        const updatedDish = await this.dish.findByIdAndUpdate(
            id,
            { $set: updatedProps },
            { new: true }
        );

        if (updatedDish) return updatedDish;
        throw new Error(`Cannot update dish with id ${id}`);
    }

    public async getDish( // TODO - improve error handling
        id: string,
        fields: { [key: string]: number }
    ): Promise<Dish> {
        const dish = await this.dish.findById(id, fields);

        if (dish) return dish;
        throw new Error(`Cannot get dish with id ${id}`);
    }

    public async deleteDish(
        id: string
    ): Promise<void> {
        const dish = await this.dish.findByIdAndDelete(id);

        if (!dish) throw new Error(`Cannot delete dish with id ${id}`);
    }
}

export default DishService;
