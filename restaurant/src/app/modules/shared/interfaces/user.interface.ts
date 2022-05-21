import { CartItem } from "@cart/types/cart-item.type";
import { RoleEnum } from "@shared/enums/role.enum";
import { Address } from "../types/address.type";

export default interface User {
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
