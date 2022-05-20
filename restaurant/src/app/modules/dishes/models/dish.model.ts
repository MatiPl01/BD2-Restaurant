import { DishData } from "@dishes/interfaces/dish.interface";
import { ImageEntry } from "@shared/interfaces/image-entry.interface";

export default class Dish {
  public readonly _id: string;
  public readonly name: string;
  public readonly category?: string;
  public readonly cuisine?: string;
  public readonly type?: string;
  public readonly ingredients?: string[];
  public readonly stock?: number;
  public readonly currency?: string;
  public readonly unitPrice?: number;
  public readonly ratingsAverage?: number;
  public readonly ratingsCount?: number;
  public readonly description?: string[];
  public readonly coverImage?: ImageEntry;
  public readonly images?: ImageEntry[];

  constructor(dish: Partial<DishData>) {
    this._id = dish._id!;
    this.name = dish.name!;
    this.category = dish.category;
    this.cuisine = dish.cuisine;
    this.type = dish.type;
    this.ingredients = dish.ingredients;
    this.stock = dish.stock;
    this.currency = dish.currency;
    this.unitPrice = dish.unitPrice;
    this.ratingsAverage = dish.ratingsAverage;
    this.ratingsCount = dish.ratingsCount;
    this.description = dish.description;
    this.coverImage = dish.coverImage;
    this.images = dish.images;
  }
}
