import { ImageEntry } from "@shared/interfaces/image-entry.interface"

export interface DishCardData {
  _id: string,
  name: string,
  category: string,
  cuisine: string,
  type: string,
  stock: number,
  currency: string,
  unitPrice: number,
  ratingsAverage: number,
  ratingsCount: number,
  coverImage: ImageEntry;
}
