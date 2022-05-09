import { first, map, Observable } from "rxjs";
import { AuthenticationService } from "@auth/services/authentication.service";
import { Injectable } from "@angular/core";
import { RoleEnum } from "@shared/enums/role.enum";
import { UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private authenticationService: AuthenticationService) {}

  public isAuthorized(
    allowedRoles: RoleEnum[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRolesSet = new Set(allowedRoles);

    return this.authenticationService.user.pipe(
      first(),
      map(user => {
        if (!user) return false;
        for (const role of user.roles) {
          if (allowedRolesSet.has(role)) return true;
        }
        return false;
      })
    )
  }
}
