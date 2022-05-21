import { Currency } from "@core/interfaces/currency.interface";

export default class CurrencyModel implements Currency {
  public readonly _id: string;
  public readonly code: string;
  public readonly symbol: string;
  public readonly name: string;

  constructor(currency: Currency) {
    this._id = currency._id;
    this.code = currency.code;
    this.symbol = currency.symbol;
    this.name = currency.name;
  }

  public static createEmpty(): Currency {
    return new CurrencyModel({
      _id: '',
      code: '',
      symbol: '',
      name: ''
    });
  }
}
