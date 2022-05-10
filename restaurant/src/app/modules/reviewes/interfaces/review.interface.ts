export interface ReviewData {
  _id:string,
  user:string,
  dish:string,
  order:string,
  rating:number,
  body:string[],
  createdAt:Date,
  updatedAt:Date
}
