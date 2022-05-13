export interface DishFilterData {
  'ratingsAverage[it]'?: number,
  'ratingsAverage[gte]'?: number,
  currency?: string,
  category?:string [],
  fields?:string [],
  'unitPrice[it]'?: number,
  'unitPrice[gte]'?: number,
  page?: number,
  limit?: number,
}
