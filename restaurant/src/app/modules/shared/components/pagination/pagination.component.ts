import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { VisualizationService } from '@core/services/visualization.service';
import { PaginationService } from '@shared/services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges, OnDestroy {
  @Output() currentPageChange = new EventEmitter<number>();
  @Input() currentPage: number = 0;
  @Input() pagesCount: number = 0;
  @Input('displayedCount') maxDisplayedNumbersCount: number = 5;

  public pagesNumbers: number[] = [];

  private previousScrollBottom = 0;
  private readonly paginationEl: HTMLElement;
  private readonly subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef,
              private paginationService: PaginationService,
              private visualizationService: VisualizationService) {
    this.paginationEl = this.elementRef.nativeElement;
    this.subscriptions.push(
      this.paginationService.currentPageSubject.subscribe(_ => {
        // TODO - Scroll to the previous scroll top value after the page number was updated
      })
    );
  }

  ngOnChanges(): void {
    this.updateMiddlePagesNumbers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public setCurrentPage(pageNum: number) {
    this.currentPage = pageNum;
    this.previousScrollBottom = this.paginationEl.getBoundingClientRect().bottom;
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
