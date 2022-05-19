import { AuthService } from "@auth/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Injectable } from "@angular/core";
import User from "@shared/models/user.model";

@Injectable()
export class UserService {
  constructor(private authService: AuthService,
              private httpService: HttpService) {}

  get user(): User | null {
    return this.authService.user;
  }

  public updateDefaultCurrency(currency: string): void {
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
