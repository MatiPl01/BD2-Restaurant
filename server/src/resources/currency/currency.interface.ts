import { Document} from 'mongoose';

export default interface Post extends Document {
    code: string;
    symbol: string;
    name: string;
}
