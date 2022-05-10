import {ImageEntry} from "@shared/interfaces/image-entry.interface";

export interface DishData {
  _id: any,
  name: string,
  category: string,
  cuisine: string,
  type: string,
  ingredients: string[],
  stock: number,
  currency: string,
  unitPrice: number,
  ratingsAverage: number,
  ratingsCount: number,
  description: string[],
  images: {
    coverIdx: number,
    gallery: ImageEntry[]
  },
  mainUnitPrice: number,
}
