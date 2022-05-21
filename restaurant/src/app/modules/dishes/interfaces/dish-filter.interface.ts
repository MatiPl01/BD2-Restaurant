export interface DishFilterData {
  'ratingsAverage[lt]'?: number,
  'ratingsAverage[gte]'?: number,
  category?:string [],
  cuisine?:string [],
  type?:string [],
  'unitPrice[lt]'?: number,
  'unitPrice[gte]'?: number
}
