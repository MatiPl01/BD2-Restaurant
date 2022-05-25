import { Review } from "@dishes/interfaces/review.interface";

export default class ReviewModel implements Review {
  public readonly _id?: any;
  public readonly user: {
    _id?: string,
    firstName: string,
    lastName: string
  };
  public readonly dish: {
    _id?: string,
    imageCover: string
  };
  public readonly order: string;
  public readonly dishName: string;
  public readonly rating: number;
  public readonly body: string[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(review: Review) {
    this._id = review._id;
    this.user = review.user;
    this.dish = review.dish;
    this.order = review.order;
    this.dishName = review.dishName;
    this.rating = review.rating;
    this.body = review.body;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }
}
