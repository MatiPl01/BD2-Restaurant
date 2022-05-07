import reviewModel from './review.model';
import orderModel from '@/resources/order/order.model';
import AppError from "@/utils/errors/app.error";
import Review from '@/resources/review/review.interface';
import Order from "@/resources/order/order.interface";


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
        userId: string,
        dishId: string,
        rating: number,
        body: string[]
    ): Promise<Review> { // TODO - maybe improve (check if added review before, etc.)
        const temp: Order[] = await this.orders.find({userId}).sort({"createdAt": -1}).limit(1)
        if ((Date.now() - temp[0].createdAt) / (1000 * 60 * 60 * 24) > 7) throw new AppError(400, `Cannot add review after 7 days`);
        const result = await this.review.create({
            user: userId,
            dish: dishId,
            order: temp[0]._id,
            rating: rating,
            body: body,
        });
        if (result) return result;
        throw new AppError(701, `Cannot add review`);
    };

    public async editReview(
        id: string,
        updatedProps: { [key: string]: number },
        userLogin: string
    ): Promise<Review> { // TODO - maybe improve (check if modified before - maybe limit the number of changes)
        const review = await this.review.findById({_id: id, user: userLogin});
        if (!review) throw new AppError(404, `Review with id ${id} for user ${userLogin} was not found`);

        if (Date.now() > +review.createdAt + 1000 * 60 * 60 * 24 * 7) {
            throw new AppError(703, `Cannot edit review after 7 days`);
        }

        return await this.review.findByIdAndUpdate(
            review.id,
            {$set: updatedProps},
            {new: true}
        ) as Review;
    }

    public async deleteReview(
        id: string,
        userLogin: string
    ): Promise<void> {
        const review = await this.review.findByIdAndDelete({_id: id, user: userLogin});

        if (!review) throw new AppError(400, `Cannot delete review with id ${id} for user ${userLogin}`);
    }

    public async getReview(
        id: string,
        fields: { [key: string]: number }
    ): Promise<Review> {
        const review = await this.review.findById(id, fields);
        if (!review) throw new AppError(702, `Cannot find review with id ${id}`);

        return review;
    }
}


export default ReviewService;
