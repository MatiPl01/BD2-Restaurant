import {Document, Schema} from 'mongoose';


export default interface Review extends Document {
    user:Schema.Types.ObjectId;
    dish:Schema.Types.ObjectId;
    order:Schema.Types.ObjectId;
    rating:number,
    body:string

}
