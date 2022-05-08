import { CurrencyEnum } from "@shared/enums/currency.enum";
import { PersistenceEnum } from "@shared/enums/persistence.enum";

export interface Config {
  mainCurrency: CurrencyEnum,
  persistence: PersistenceEnum
}
