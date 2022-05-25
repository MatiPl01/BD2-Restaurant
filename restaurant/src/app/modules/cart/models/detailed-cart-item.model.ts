import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import { Currency } from "@core/interfaces/currency.interface";
import { Dish } from "@dishes/interfaces/dish.interface";
import { ImageEntry } from "@shared/types/image-entry.type";

export default class DetailedCartItemModel implements DetailedCartItem {
  public dishId: string;
  public dishName: string;
  public category: string;
  public cuisine: string;
  public type: string;
  public unitPrice: number;
  public quantity: number;
  public currency: string;
  public stock: number;
  public coverImage: ImageEntry;

  constructor(item: DetailedCartItem) {
    this.dishId = item.dishId;
    this.dishName = item.dishName;
    this.category = item.category;
    this.cuisine = item.cuisine;
    this.type = item.type;
    this.unitPrice = item.unitPrice;
    this.quantity = item.quantity;
    this.currency = item.currency;
    this.stock = item.stock;
    this.coverImage = item.coverImage;
  }

  public static fromDish(dish: Dish, quantity: number): DetailedCartItemModel {
    return new DetailedCartItemModel({
      dishId: dish._id,
      dishName: dish.name,
      category: dish.category,
      cuisine: dish.cuisine,
      type: dish.type,
      unitPrice: dish.unitPrice,
      quantity: quantity,
      currency: dish.currency,
      stock: dish.stock,
      coverImage: dish.coverImage
    });
  }
}
