import { Document } from 'mongoose';
import CurrencyEnum from '@/utils/enums/currency.enum';
import PersistenceEnum from '@/utils/enums/persistence.enum';


export default interface Global extends Document {
    persistence: PersistenceEnum;
    mainCurrency: CurrencyEnum;
}
