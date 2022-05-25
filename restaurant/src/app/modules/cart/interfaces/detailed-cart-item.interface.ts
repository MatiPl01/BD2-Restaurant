import { ImageEntry } from "@shared/types/image-entry.type";

export default interface DetailedCartItem {
  dishId: string;
  dishName: string;
  category: string;
  cuisine: string;
  type: string;
  unitPrice: number;
  quantity: number;
  currency: string;
  stock: number;
  coverImage: ImageEntry;
  images: ImageEntry[];
}
