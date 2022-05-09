import { Injectable } from '@angular/core'
import { HttpService } from "@core/services/http.service";
import { Config } from "@shared/interfaces/config.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Observable } from "rxjs";
import { HttpResponse } from '@shared/interfaces/http-response.interface';

@Injectable()
export class AdminService {
  constructor(private httpService: HttpService) {}

  updateConfig(updatedFields: Partial<Config>): Observable<HttpResponse<Config>> {
    return this.httpService.patch<HttpResponse<Config>>(ApiPathEnum.CONFIG, updatedFields);
  }
}
