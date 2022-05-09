import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { AuthenticationService } from "@auth/services/authentication.service"
import { exhaustMap, first } from "rxjs/operators"
import { Injectable } from "@angular/core"
import User from "@shared/models/user"

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userSubject.pipe(
      first(),
      exhaustMap((user: User | null) => {
        // Try to make an original request if there is no user logged in
        if (!user) return next.handle(req);
        // Otherwise, send a request with user JWT token
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
        })

        return next.handle(modifiedReq);
      })
    )
  }
}
