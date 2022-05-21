import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, timer } from "rxjs";
import { Config } from "@core/interfaces/config.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { HttpService } from "@core/services/http.service";
import ConfigModel from '@core/models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static readonly REFRESH_INTERVAL = 300000; // 5min

  private readonly config$ = new BehaviorSubject<Config>(ConfigModel.createEmpty());
  private timer$!: Observable<number>; 

  private readonly subscriptions: Subscription[] = [];

  constructor(private httpService: HttpService) {
    this.fetchConfig();
    this.setupRefreshTimer();
  }

  get config(): Config {
    return this.configSubject.getValue();
  }

  get configSubject(): BehaviorSubject<Config> {
    return this.config$
  }

  private fetchConfig(): void {
    this.httpService.get<Config>(ApiPathEnum.CONFIG)
      .pipe(map(config => new ConfigModel(config)))
      .subscribe(config => this.config$.next(config));
  }

  private setupRefreshTimer(): void {
    this.timer$ = timer(0, ConfigService.REFRESH_INTERVAL);

    this.subscriptions.push(
      this.timer$.subscribe(_ => this.fetchConfig())
    );
  }
}
