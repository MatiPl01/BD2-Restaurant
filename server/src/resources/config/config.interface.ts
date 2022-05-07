import { Document } from 'mongoose';
import CurrencyEnum from '@/utils/enums/currency.enum';
import PersistenceEnum from '@/utils/enums/persistence.enum';


export default interface Config extends Document {
    persistence: PersistenceEnum;
    mainCurrency: CurrencyEnum;
}
