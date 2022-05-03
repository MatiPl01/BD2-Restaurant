import { Document } from 'mongoose';


export default interface Global extends Document {
    persistence: number;
    mainCurrency: string;
}
