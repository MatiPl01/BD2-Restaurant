import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router"
import { map, Observable } from "rxjs";
import { AuthService } from "@auth/services/auth.service";
import { Injectable } from "@angular/core";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const allowedRolesSet = new Set(route.data['restrictTo']);

    return this.authService.userSubject.pipe(
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
