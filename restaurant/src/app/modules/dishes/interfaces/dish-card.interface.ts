import { ImageEntry } from "@shared/types/image-entry.type"

export interface DishCard {
  _id: string;
  name: string;
  category: string;
  cuisine: string;
  type: string;
  stock: number;
  currency: string;
  unitPrice: number;
  ratingsAverage: number;
  ratingsCount: number;
  coverImage: ImageEntry;
}
