import UserData, { Address } from "@auth/interfaces/user.interface";
import { CurrencyEnum } from "@shared/enums/currency.enum";
import { CartItem } from "@cart/interfaces/cart-item.interface";
import { RoleEnum } from "@shared/enums/role.enum";

export default class User {
  private addresses: Address[];
  private banned: boolean;
  private cart: CartItem[];
  private defaultCurrency: CurrencyEnum;
  private email: string;
  private firstName: string;
  private lastName: string;
  private nickName: string;
  private orders: string[];
  private readonly updatedAt: Date;
  private readonly createdAt: Date;
  private readonly _roles: RoleEnum[];
  private readonly _token: string;

  constructor(user: UserData, token: string) {
    this.addresses = user.addresses;
    this.banned = user.banned;
    this.cart = user.cart;
    this.defaultCurrency = user.defaultCurrency;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.nickName = user.nickName;
    this.orders = user.orders;
    this.updatedAt = new Date(user.updatedAt);
    this.createdAt = new Date(user.createdAt);
    this._roles = user.roles;
    this._token = token;
  }

  get token(): string | null {
    return this.tokenExpirationDuration > 0 ? this._token : null;
  }

  get tokenExpirationTimestamp(): number {
    return this.parseToken().exp;
  }

  get roles(): RoleEnum[] {
    return [...this._roles];
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
