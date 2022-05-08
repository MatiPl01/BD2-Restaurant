import reviewModel from './review.model';
import orderModel from '@/resources/order/order.model';
import AppError from "@/utils/errors/app.error";
import Review from '@/resources/review/review.interface';
import Order from "@/resources/order/order.interface";
import {Schema} from 'mongoose';


class ReviewService {
    private review = reviewModel;
    private orders = orderModel

    public async getReviews(
        filters: { [key: string]: any },
        fields: { [key: string]: number },
        pagination: { skip: number, limit: number }
    ): Promise<Partial<Review>[]> {
        return this.review.find(filters, fields, pagination);
    }

    public async createReview(
        userID: Schema.Types.ObjectId,
        dishID: Schema.Types.ObjectId,
        orderID: Schema.Types.ObjectId,
        rating: number,
        body: string[]
    ): Promise<Review> { // TODO - maybe improve (check if added review before, etc.)
        // const temp: Order[] = await this.orders.find({userID}).sort({createdAt: -1}).limit(1);
        const order = await this.orders.findById(orderID);

        if (!order) {
            throw new AppError(404, `Cannot find order with id ${orderID}`);
        }

        if (!order.items.find(item => String(item.dish) === String(dishID))) {
            throw new AppError(400, `Dish with id ${dishID} doesn't belong to the order with id ${orderID}`);
        }

        if ((Date.now() - order.createdAt) / (1000 * 60 * 60 * 24) > 7) {
            throw new AppError(400, 'Cannot add review after 7 days');
        }

        const result = await this.review.create({
            user: userID,
            dish: dishID,
            order: order._id,
            rating: rating,
            body: body,
        });

        if (result) return result;
        throw new AppError(400, 'Cannot add review');
    };

    public async editReview(
        id: Schema.Types.ObjectId,
        userID: Schema.Types.ObjectId,
        updatedProps: { [key: string]: number }
    ): Promise<Review> { // TODO - maybe improve (check if modified before - maybe limit the number of changes)
        const review = await this.review.findById({ _id: id, user: userID});
        if (!review) throw new AppError(404, `User ${userID} has not review with id ${id}`);

        if (Date.now() > +review.createdAt + 1000 * 60 * 60 * 24 * 7) {
            throw new AppError(401, 'Cannot edit review after 7 days');
        }

        return await this.review.findByIdAndUpdate(
            review.id,
            {$set: updatedProps},
            {new: true}
        ) as Review;
    }

    public async deleteReview(
        id: Schema.Types.ObjectId,
        userID: Schema.Types.ObjectId,
    ): Promise<void> {
        const review = await this.review.findByIdAndDelete({_id: id, user: userID});

        if (!review) throw new AppError(400, `Cannot delete review with id ${id} for user ${userID}`);
    }

    public async getReview(
        id: Schema.Types.ObjectId,
        fields: { [key: string]: number }
    ): Promise<Review> {
        const review = await this.review.findById(id, fields);
        if (!review) throw new AppError(404, `Cannot find review with id ${id}`);

        return review;
    }
}


export default ReviewService;
