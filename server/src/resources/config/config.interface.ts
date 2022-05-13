import { Document, ClientSession } from 'mongoose';
import PersistenceEnum from '@/utils/enums/persistence.enum';


export default interface Config extends Document {
    persistence: PersistenceEnum;
    mainCurrency: string;

    updateMainCurrency(currency: string, session?: ClientSession): void;
}
