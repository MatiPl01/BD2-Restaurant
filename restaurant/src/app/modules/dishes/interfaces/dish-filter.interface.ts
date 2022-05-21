export interface DishFilterData {  // TODO - is this necessary?
  'ratingsAverage[lt]'?: number,
  'ratingsAverage[gte]'?: number,
  category?:string [],
  cuisine?:string [],
  type?:string [],
  'unitPrice[lt]'?: number,
  'unitPrice[gte]'?: number
}
