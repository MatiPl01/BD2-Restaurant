import { PersistenceEnum } from "@shared/enums/persistence.enum";

export interface Config {
  mainCurrency: string;
  persistence: PersistenceEnum;
}
