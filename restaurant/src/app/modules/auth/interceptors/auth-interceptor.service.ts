import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { AuthService } from "@auth/services/auth.service"
import { exhaustMap, first } from "rxjs/operators"
import { Injectable } from "@angular/core"
import User from "@shared/models/user.model"

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userSubject.pipe(
      first(),
      exhaustMap(user => {
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
