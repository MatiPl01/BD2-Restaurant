export interface ReviewData {
  _id?:any,
  user:string,
  dish:string,
  order:string,
  rating:number,
  body:string[],
  createdAt:Date,
  updatedAt:Date
}
