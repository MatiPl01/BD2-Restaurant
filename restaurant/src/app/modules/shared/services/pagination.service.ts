import { Injectable } from "@angular/core";

@Injectable()
export class PaginationService {
  private _itemsPerPage: number = 10;  // TODO - implement this service

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }
}
