import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'shared-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  @Input() diableRating: boolean = false;
  @Input() value: number = 0;
  @Output() valueChangeEvent = new EventEmitter<number>();
  public displayedRating: number = 0;
  public hasUserRated: boolean = false; // Indicates if an user left their own rating
  public readonly star_numbers: number[] = [];
  private isRendered: boolean = false;

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
    if (!this.diableRating) {
      this.hasUserRated = true;
      this.value = parseInt((<HTMLInputElement>event.target).value) / 2;
      this.valueChangeEvent.emit(this.value);
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
      this.elRef.nativeElement.querySelector(`.rating__radio[value="$;{segmentsCount}"]`).checked = true;
    }
  }
}
