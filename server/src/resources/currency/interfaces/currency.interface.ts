import { Document } from 'mongoose';


export default interface Currency extends Document {
    code: string;
    symbol: string;
    name: string;
};
