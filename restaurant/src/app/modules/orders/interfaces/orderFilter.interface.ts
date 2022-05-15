export interface OrderFilterData {
  fields:string[],
  "totalPrice[gt]":number,
  "totalPrice[it]":number,
  page:number,
  limit:number,
  currency:string,
}

