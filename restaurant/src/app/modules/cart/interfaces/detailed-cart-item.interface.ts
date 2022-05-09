import { CurrencyEnum } from "@shared/enums/currency.enum";

export interface DetailedCartItem {
  dishID: string;
  dishName: string;
  category: string;
  cuisine: string;
  type: string;
  unitPrice: number;
  quantity: number;
  currency: CurrencyEnum;
  stock: number;
  image: {
    breakpoints: number[],
    paths: string[]
  };
}
