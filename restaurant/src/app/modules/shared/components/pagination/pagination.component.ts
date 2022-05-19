import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() noPages!: number;
  @Output() pageChangeEvent = new EventEmitter<number>();
  public readonly pagesNumbers: number[] = [];
  public currentPage = 0;

  public setCurrentPage(pageNum: number): void {
    if (pageNum === this.currentPage) return;
    this.currentPage = pageNum;
    this.pageChangeEvent.emit(pageNum);
  }
}
