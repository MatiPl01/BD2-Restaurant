import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QueryOptions } from "@core/types/query-options.type";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private queryOptions: { [key: string]: string | string[] } = {};

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  public setQueryOptions(options: QueryOptions, apply: boolean = true): void {
    Object.entries(options).forEach(([key, value]) => {
      if (typeof value !== 'string' && this.isIterable(value)) {
        this.queryOptions[key] = [...(value as Iterable<string> | Iterable<number>)]
          .map(String)
          .join(',');
      } else {
        this.queryOptions[key] = value.toString();
      }

      if (apply) this.applyQuery();
    });
  }

  public applyQuery(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.queryOptions,
      replaceUrl: true
    })
  }

  public removeQueryOptions(options: string[]): void {
    options.forEach(option => delete this.queryOptions[option]);
  }

  public clearQuery(): void {
    this.queryOptions = {};
  }

  private isIterable(obj: any): boolean {
    return Symbol.iterator in Object(obj);
  }
}
