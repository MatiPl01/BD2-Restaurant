import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'shared-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  @Output() valueChange = new EventEmitter<number>();
  @Input() disableRating: boolean = false;
  @Input() value: number = 0;
  public displayedRating: number = 0;
  public hasUserRated: boolean = false; // Indicates if the user left their rating
  private isRendered: boolean = false;
  public readonly star_numbers: number[] = [];

  constructor(private elRef: ElementRef) {
    this.star_numbers = Array(10).fill(0).map((_, i) => 10 - i);
  }

  ngOnInit(): void {
    this.displayedRating = this.value;
  }

  ngAfterViewInit(): void {
    this.displayRating();
    this.isRendered = true;
  }

  ngOnChanges(): void {
    this.displayedRating = this.value;
    if (this.isRendered) this.displayRating();
  }

  onRatingChange(event: Event): void {
    if (!this.disableRating) {
      this.hasUserRated = true;
      this.value = parseInt((<HTMLInputElement>event.target).value) / 2;
      this.valueChange.emit(this.value);
      this.displayRating();
    }
  }

  onMouseEnter(rating: number): void {
    this.displayedRating = rating / 2;
  }

  onMouseLeave(): void {
    this.displayedRating = this.value;
  }

  private displayRating(): void {
    const segmentsCount = +(2 * this.displayedRating).toFixed()
    if (segmentsCount > 0) {
      this.elRef.nativeElement.querySelector(`.rating__radio[value="${segmentsCount}"]`).checked = true;
    }
  }
}
