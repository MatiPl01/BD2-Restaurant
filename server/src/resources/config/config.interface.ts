import CurrencyEnum from '@/utils/enums/currency.enum';
import PersistenceEnum from '@/utils/enums/persistence.enum';
import { Document } from 'mongoose';


export default interface Config extends Document {
    persistence: PersistenceEnum;
    defaultCurrency: CurrencyEnum;
}
