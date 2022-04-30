import { Schema, model } from 'mongoose';
import Review from '@/resources/review/review.interface';

const reviewSchema = new Schema(

);

export default model<Review>('Review', reviewSchema);
