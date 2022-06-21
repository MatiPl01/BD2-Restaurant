import { Schema } from 'mongoose';

import AppError from '@/utils/errors/app.error';

import OrderModel from '@/resources/order/order.model';
import DishModel from '@/resources/dish/dish.model';
import ReviewModel from './review.model';
import Review from './interfaces/review.interface';


class ReviewService {
    private review = ReviewModel;
    private orders = OrderModel;
    private dish = DishModel;

    public async getReviews(
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Partial<Review>[]> {
        return this.review.find(filters, fields, pagination);
    }

    public async createReview(
        userId: Schema.Types.ObjectId,
        dishId: Schema.Types.ObjectId,
        orderId: Schema.Types.ObjectId,
        rating: number,
        body: string[]
    ): Promise<Review> { // TODO - maybe improve
        const order = await this.orders.findById(orderId);

        if (!order) {
            throw new AppError(404, `Cannot find order with id ${orderId}`);
        }

        if (!order.items.find(item => String(item.dish) === String(dishId))) {
            throw new AppError(400, `Dish with id ${dishId} doesn't belong to the order with id ${orderId}`);
        }

        if ((Date.now() - Number(order.createdAt)) / (1000 * 60 * 60 * 24) > 7) {
            throw new AppError(400, 'Cannot add review after 7 days');
        }

        const reviews = await this.review.find({ user: userId, dish: dishId, order: orderId });
        if (reviews.length > 0) {
            throw new AppError(400, 'You have already added review for this dish from this order');
        }

        // Update the dish rating
        const dish = await this.dish.findById(dishId);
        if (!dish) throw new AppError(404, `Cannot find dish with id ${dishId}`);

        // Todo - check if there are no rounding issues
        dish.ratingsAverage = (dish.ratingsAverage * dish.ratingsCount + rating) / ++dish.ratingsCount;
        await dish.save();

        const result = await this.review.create({
            user: userId,
            dish: dishId,
            order: order._id,
            rating: rating,
            body: body,
        });

        if (!result) throw new AppError(400, 'Cannot add review');

        return result;
    };

    public async editReview(
        id: Schema.Types.ObjectId,
        userID: Schema.Types.ObjectId,
        updatedProps: { [key: string]: number }
    ): Promise<Review> { // TODO - maybe improve (check if modified before - maybe limit the number of changes)
        const review = await this.review.findById({ _id: id, user: userID });
        if (!review) throw new AppError(404, 'You are not allowed to edit this review');

        if (Date.now() > +review.createdAt + 1000 * 60 * 60 * 24 * 7) {
            throw new AppError(401, 'Cannot edit review after 7 days');
        }

        return await this.review.findByIdAndUpdate(
            review.id,
            { $set: updatedProps },
            { new: true }
        ) as Review;
    }

    public async deleteReview(
        id: Schema.Types.ObjectId,
        userID: Schema.Types.ObjectId,
    ): Promise<void> {
        const review = await this.review.findByIdAndDelete({ _id: id, user: userID });

        if (!review) throw new AppError(400, 'Cannot delete review');
    }
}


// Create and export review service singleton instance
export default new ReviewService();
