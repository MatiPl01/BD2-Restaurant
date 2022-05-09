export interface CartItem {
  dish: {
    id: string,
    name: string,
    stock: number
  };
  quantity: number;
}
