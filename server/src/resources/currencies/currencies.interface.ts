import { Document} from 'mongoose';

export default interface ExchangeRatesService extends Document {
    code: string;
    symbol: string;
    name: string;
}
