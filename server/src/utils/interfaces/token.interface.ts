import { Schema } from 'mongoose';


interface Token extends Object {
    id: Schema.Types.ObjectId;
    iat: number;
    expiresIn: number;
}


export default Token;
