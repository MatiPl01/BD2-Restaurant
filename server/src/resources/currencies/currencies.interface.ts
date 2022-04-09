import { Document, ObjectId } from 'mongoose';

export default interface Post extends Document {
    _id: ObjectId
    code: string;
    symbol: string;
    name: string;
}
