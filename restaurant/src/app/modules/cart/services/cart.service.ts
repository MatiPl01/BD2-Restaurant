import { Injectable } from '@angular/core'
import { HttpService } from "@core/services/http.service";
import { Config } from "@shared/interfaces/config.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Observable } from "rxjs";

@Injectable()
export class CartService {
  constructor(private httpService: HttpService) {}

  getUserCart(): Observable<Config> {
    return this.httpService.patch<Config>(ApiPathEnum.CONFIG, updatedFields);
  }
}
