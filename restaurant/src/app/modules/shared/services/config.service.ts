import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Config} from "@shared/interfaces/config.interface";
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {HttpService} from "@core/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpService: HttpService) {}

  getConfig():Observable<Config> {
    return this.httpService.get<Config>(ApiPathEnum.CONFIG);
  }

}
