import { ImageEntry } from "@shared/types/image-entry.type";

export interface Dish {
  _id: string;
  name: string;
  category: string;
  cuisine: string;
  type: string;
  ingredients: string[];
  stock: number;
  currency: string;
  unitPrice: number;
  ratingsAverage: number;
  ratingsCount: number;
  description: string[];
  coverImage: ImageEntry;
  images: ImageEntry[];
}
