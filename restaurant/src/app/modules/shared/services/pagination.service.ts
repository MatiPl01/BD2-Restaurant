import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PaginationService {
  private static readonly POSSIBLE_ITEMS_PER_PAGE = [3, 6, 9, 12, 15, 30, 45];
  
  private readonly pagesCount$ = new BehaviorSubject<number>(1);
  private readonly currentPage$ = new BehaviorSubject<number>(1);
  private readonly itemsPerPage$ = new BehaviorSubject<number>(12);
  private readonly possibleItemsPerPage$ = new BehaviorSubject<number[]>([...PaginationService.POSSIBLE_ITEMS_PER_PAGE]);

  private _allPossibleItemsPerPage: number[] = [...PaginationService.POSSIBLE_ITEMS_PER_PAGE];
  private _allItemsCount: number = 0;

  get pagesCountSubject(): BehaviorSubject<number> {
    return this.pagesCount$;
  }

  get currentPageSubject(): BehaviorSubject<number> {
    return this.currentPage$;
  }

  get itemsPerPageSubject(): BehaviorSubject<number> {
    return this.itemsPerPage$;
  }

  get possibleItemsPerPageSubject(): BehaviorSubject<number[]> {
    return this.possibleItemsPerPage$;
  }

  get pagesCount(): number {
    return this.pagesCount$.getValue();
  }

  get currentPage(): number {
    return this.currentPage$.getValue();
  }

  get itemsPerPage(): number {
    return this.itemsPerPage$.getValue();
  }

  get possibleItemsPerPage(): number[] {
    return this.possibleItemsPerPage$.getValue();
  }

  get allItemsCount(): number {
    return this._allItemsCount;
  }

  public updateItemsPerPage(count: number): void {
    if (count !== this.itemsPerPage) this.itemsPerPage$.next(count);
  }

  public setAllPossibleItemsPerPage(itemsPerPageArray: number[]): void {
    this._allPossibleItemsPerPage = [...itemsPerPageArray];
    this._allPossibleItemsPerPage.sort();
    this.updatePossibleItemsPerPage();
  }

  public setCurrentPage(currentPage: number): void {
    console.log('>> set current page', this.currentPage, currentPage)
    if (this.currentPage !== currentPage) this.currentPage$.next(currentPage);
  }

  public updatePages(pagesCount: number, currentPage?: number, itemsCount?: number): void {
    if (this.pagesCount !== pagesCount) {
      this.pagesCount$.next(pagesCount);
    }
    if (currentPage !== undefined) {
      this.setCurrentPage(currentPage);
    }

    if (itemsCount) {
      if (this._allItemsCount === itemsCount) return;
      this._allItemsCount = itemsCount;
      // Update possible items per page (e.q. it's not necessary to allow to choose 45
      // items per page it we have only 20 items in total, etc.)
      this.updatePossibleItemsPerPage();
    }
  }

  private updatePossibleItemsPerPage(): void {  // FIXME - fix issues when there are not enough items (items per page count is not displayed)
    const possibleItemsPerPage: number[] = [];
    let i = -1;

    for (; i < this._allPossibleItemsPerPage.length; ++i) {
      if (this._allPossibleItemsPerPage[i] < this._allItemsCount) {
        possibleItemsPerPage.push(this._allPossibleItemsPerPage[i]);
      }
    }

    if (i + 1 < this._allPossibleItemsPerPage.length) {
      possibleItemsPerPage.push(this._allPossibleItemsPerPage[i + 1]);
    }

    this.possibleItemsPerPage$.next(possibleItemsPerPage);
  }
}
