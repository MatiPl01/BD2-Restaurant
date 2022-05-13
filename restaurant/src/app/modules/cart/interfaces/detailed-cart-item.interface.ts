export interface DetailedCartItem {
  dishID: string;
  dishName: string;
  category: string;
  cuisine: string;
  type: string;
  unitPrice: number;
  quantity: number;
  currency: string;
  stock: number;
  image: {
    breakpoints: number[],
    paths: string[]
  };
}
