import User from "@shared/interfaces/user.interface";
import { CartItem } from "@cart/types/cart-item.type";
import { RoleEnum } from "@shared/enums/role.enum";
import { Address } from "@shared/types/address.type";

// TODO - maybe make these fields not public
export default class UserModel implements User {
  public readonly _id: string;
  public addresses: Address[];
  public banned: boolean;
  public cart: CartItem[];
  public email: string;
  public firstName: string;
  public lastName: string;
  public orders: string[];
  public nickName: string;
  public defaultCurrency: string;
  public readonly updatedAt: Date;
  public readonly createdAt: Date;
  public readonly roles: RoleEnum[];
  public readonly _token: string;

  constructor(user: User, token: string) {
    this._id = user._id;
    this.addresses = user.addresses;
    this.banned = user.banned;
    this.cart = user.cart;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.orders = user.orders;
    this.updatedAt = new Date(user.updatedAt);
    this.createdAt = new Date(user.createdAt);
    this.nickName = user.nickName;
    this.defaultCurrency = user.defaultCurrency;
    this.roles = user.roles;
    this._token = token;
  }

  get token(): string | null {
    return this.tokenExpirationDuration > 0 ? this._token : null;
  }

  get tokenExpirationTimestamp(): number {
    return this.parseToken().exp;
  }

  get tokenExpirationDuration(): number {
    const expTimestamp = this.tokenExpirationTimestamp * 1000;
    const currTimestamp = Math.floor((new Date).getTime());
    return expTimestamp - currTimestamp;
  }

  private parseToken() {
    return JSON.parse(atob(this._token.split('.')[1]));
  }
}
