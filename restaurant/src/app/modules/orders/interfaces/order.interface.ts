export interface OrderData {
  _id:string
  user:string,
  items:OrderItemsData[],
  currency:string,
  totalPrice:number,
}
export interface OrderItemsData{
  dish:string,
  quantity:number,
  dishName:string,
  unitPrice:number
}
