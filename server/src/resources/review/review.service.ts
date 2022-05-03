import Review from '@/resources/review/review.interface';
import Order from "@/resources/order/order.interface";
import reviewModel from './review.model';
import orderModel from '@/resources/order/order.model';
import AppError from "@/utils/errors/app.error";
import {Response} from "express";


class ReviewService {
    private review = reviewModel;
    private orders = orderModel

    public async createReview(
        userId: string,dishId:string,rating:number,body:string
    ): Promise<Review | Error> {
        const temp = await this.orders.find({userId}).sort({"createdAt": -1}).limit(1)
        // @ts-ignore
        if ((Date.now() - temp[0].createdAt) / (1000 * 60 * 60 * 24) > 7) throw new AppError(400, `Cannot add review after 7 days`);
        const result = await this.review.create({
            user: userId,
            dish: dishId,
            order: temp[0]._id,
            rating: rating,
            body: body,
        });
        if (result) return result;
        throw new AppError(400, `Cannot add review`);
    };

    public async editReview(
        reviewId: string,
        reviewBody: string,
        reviewRating: number,
    ): Promise<Review | Error> {
        const temp = await this.review.find({_id:reviewId});
        // @ts-ignore
        if ((Date.now() - temp[0].createdAt) / (1000 * 60 * 60 * 24) > 7) throw new AppError(400, `Cannot edit review after 7 days`);
        const result = await this.review.findOneAndUpdate(
            {_id: reviewId},
            {
                body: reviewBody,
                rating: reviewRating
            }
        );
        if (result) return result;
        throw new AppError(400, `Cannot edit review`);
    }

    public async deleteReview(
        reviewId: string,
    ): Promise<Response | void> {
        console.log(reviewId)
        const result = await this.review.findOneAndDelete({_id: reviewId});
        if (!result)throw new AppError(400, `Cannot delete review`);
    }

    public async getReviews(
        dishId: string,
    ): Promise<Review[] | Error> {
        const result = await this.review.find({dish: dishId});
        if (result) return result;
        throw new AppError(400, `Cannot get reviews`);
    }
}


export default ReviewService;
