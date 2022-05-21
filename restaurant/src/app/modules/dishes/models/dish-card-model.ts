import { DishCard } from "@dishes/interfaces/dish-card.interface";
import { ImageEntry } from "@shared/types/image-entry.type";

export default class DishCardModel implements DishCard {
  public readonly _id: string;
  public readonly name: string;
  public readonly category: string;
  public readonly cuisine: string;
  public readonly type: string;
  public readonly stock: number;
  public readonly currency: string;
  public readonly unitPrice: number;
  public readonly ratingsAverage: number;
  public readonly ratingsCount: number;
  public readonly coverImage: ImageEntry;

  constructor(dish: DishCard) {
    this._id = dish._id;
    this.name = dish.name;
    this.category = dish.category;
    this.cuisine = dish.cuisine;
    this.type = dish.type;
    this.stock = dish.stock;
    this.currency = dish.currency;
    this.unitPrice = dish.unitPrice;
    this.ratingsAverage = dish.ratingsAverage;
    this.ratingsCount = dish.ratingsCount;
    this.coverImage = dish.coverImage;
  }
}
