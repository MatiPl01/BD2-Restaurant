import { Config } from "@core/interfaces/config.interface";
import { PersistenceEnum } from "@shared/enums/persistence.enum";

export default class ConfigModel implements Config {
  public readonly mainCurrency: string;
  public readonly persistence: PersistenceEnum;

  constructor(config: Config) {
    this.mainCurrency = config.mainCurrency;
    this.persistence = config.persistence;
  }

  public static createEmpty(): Config {
    return new ConfigModel({
      mainCurrency: '',
      persistence: PersistenceEnum.NONE
    })
  }
}
