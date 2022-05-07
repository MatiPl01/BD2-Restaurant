import {Document} from 'mongoose';


export default interface ExchangeRate extends Document {
    rate: number;
    from: string;
    to: string;
}
