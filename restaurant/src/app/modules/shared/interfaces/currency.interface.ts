import {CurrencyEnum} from "@shared/enums/currency.enum";

export interface CurrencyData {
  _id:any
  code:CurrencyEnum,
  symbol:string,
  name:string,
}
