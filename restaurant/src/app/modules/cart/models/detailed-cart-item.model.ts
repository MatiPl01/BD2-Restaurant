import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
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
}
