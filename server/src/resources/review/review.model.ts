import Review from '@/resources/review/review.interface';
import { Schema, model } from 'mongoose';


const reviewSchema = new Schema(
  {

  },
  {
    versionKey: false
  }
);


export default model<Review>('Review', reviewSchema);
