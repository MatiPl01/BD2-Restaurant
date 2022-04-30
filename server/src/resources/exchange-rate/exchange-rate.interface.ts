import { Document } from 'mongoose';

export default interface ExchangeRate extends Document {
    ratio: number;
    from: string;
    to: string;
}
