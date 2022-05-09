import { AuthenticationService } from "@auth/services/authentication.service";
import { CurrencyEnum } from "@shared/enums/currency.enum";
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Injectable } from "@angular/core";
import User from "@shared/models/user";

@Injectable()
export class UserService {
  constructor(private authenticationService: AuthenticationService,
              private httpService: HttpService) {}

  get user(): User | null {
    return this.authenticationService.user;
  }

  public updateDefaultCurrency(currency: CurrencyEnum): void {
    const user = this.user;
    if (!user) throw new Error('Cannot update user currency. No user is currently logged in');
    user.currency = currency;

    this.httpService.patch<User>(ApiPathEnum.USERS, {
      defaultCurrency: currency
    }).subscribe(user => {
      console.log(user) // TODO
    })
  }
}
