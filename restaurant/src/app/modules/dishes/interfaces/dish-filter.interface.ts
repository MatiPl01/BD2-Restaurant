import {CurrencyEnum} from "@shared/enums/currency.enum";

export interface DishFilterData {
  "ratingsAverage[it]"?:number,
  "ratingsAverage[gte]"?:number,
  currency?:CurrencyEnum,
  category?:string[],
  fields?:string[],
  "unitPrice[it]"?:number,
  "unitPrice[gte]"?:number,
  page?:number,
  limit?:number,
}
