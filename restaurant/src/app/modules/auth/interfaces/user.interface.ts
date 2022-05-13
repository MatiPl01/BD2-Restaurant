import { CartItem } from "@cart/interfaces/cart-item.interface";
import { RoleEnum } from "@shared/enums/role.enum";

export interface Address {
  firstName: String,
  lastName: String,
  phone: String,
  country: String,
  postalCode: String,
  city: String,
  street: String,
  streetNumber: String,
  flatNumber?: String
}

export default interface UserData {
  _id:any,
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  addresses: Address[];
  roles: RoleEnum[];
  orders: string[];
  cart: CartItem[];
  defaultCurrency: string;
  banned: boolean;
  updatedAt: Date,
  createdAt: Date
}
