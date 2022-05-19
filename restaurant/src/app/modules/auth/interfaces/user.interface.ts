import { CartItem } from "@cart/interfaces/cart-item.interface";
import { RoleEnum } from "@shared/enums/role.enum";

export interface Address {
  firstName: string,
  lastName: string,
  phone: string,
  country: string,
  postalCode: string,
  city: string,
  street: string,
  streetNumber: string,
  flatNumber?: string
}

export default interface UserData {
  _id: string,
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
