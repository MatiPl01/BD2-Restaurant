import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService) {}

  // TODO -add some interface for return value
  public login(credentials: LoginCredentials): Observable<{status: string, data: string}> {
    return this.httpService.post(ApiPathEnum.LOGIN, credentials);
  }
}
