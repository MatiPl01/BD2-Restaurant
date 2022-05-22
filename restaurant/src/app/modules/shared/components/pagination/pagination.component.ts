import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Output() currentPageChange = new EventEmitter<number>();
  @Input() currentPage: number = 0;
  @Input() pagesCount: number = 0;
  @Input('displayedCount') maxDisplayedNumbersCount: number = 5;

  public pagesNumbers: number[] = [];

  ngOnChanges(): void {
    console.log('><><>< updateMiddlePagesNumbers')
    this.updateMiddlePagesNumbers();
  }

  public setCurrentPage(pageNum: number) {
    this.currentPage = pageNum;
    this.currentPageChange.emit(pageNum);
  }

  private updateMiddlePagesNumbers() {
    if (this.pagesCount < 3) this.pagesNumbers = [];
    const middleCount = this.maxDisplayedNumbersCount - 2;
    let startNum = this.currentPage - Math.floor(middleCount / 2);
    let endNum = startNum + middleCount - 1;
    const lastPossible = this.pagesCount - 1;

    if (startNum < 2) {
      endNum = Math.min(endNum + (2 - startNum), lastPossible);
      startNum = 2;
    } else if (endNum > lastPossible) {
      startNum = Math.max(2, startNum - (endNum - lastPossible));
      endNum = lastPossible;
    }

    const arr = [];
    for (let i = startNum; i <= endNum; i++) arr.push(i);
    this.pagesNumbers = arr;
  }
}
