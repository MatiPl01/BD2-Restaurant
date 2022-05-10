import {CurrencyEnum} from "@shared/enums/currency.enum";

export interface ExchangeRateData {
  _id:any
  rate:Number,
  from:CurrencyEnum,
  to:CurrencyEnum,
}
