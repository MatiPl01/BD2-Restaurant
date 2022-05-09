import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Injectable } from '@angular/core'
import { Observable } from "rxjs";
import { Config } from "@shared/interfaces/config.interface";

@Injectable()
export class AdminService {
  constructor(private httpService: HttpService) {}

  updateConfig(updatedFields: Partial<Config>): Observable<Config> {
    return this.httpService.patch<Config>(ApiPathEnum.CONFIG, updatedFields);
  }
}
