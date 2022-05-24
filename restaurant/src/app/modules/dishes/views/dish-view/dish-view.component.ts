import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { VisualizationService } from "@core/services/visualization.service";
import Dish from "@dishes/models/dish.model";
import { skip, Subscription } from 'rxjs';
import { DishPageService } from '@dishes/services/dish-page.service';
import { CurrencyService } from '@core/services/currency.service';

@Component({
  selector: 'dishes-dish-view',
  templateUrl: './dish-view.component.html',
  providers: [DishPageService]
})
export class DishViewComponent implements OnDestroy, AfterViewInit {
  @ViewChild('reviews') reviewsRef!: ElementRef;
  public dish!: Dish;
  public ratingText: string = '';
  public imagesAlts: string[] = [];

  public isLoading = false;
  private readonly subscriptions: Subscription[] = [];

  constructor(private visualizationService: VisualizationService,
              private dishPageService: DishPageService,
              public currencyService: CurrencyService) {
      this.subscriptions.push(
        this.dishPageService.dishSubject.subscribe(dish => {
          if (!dish) return;
          this.dish = dish;
          this.ratingText = this.getRatingText();
          this.imagesAlts = this.getImagesAlts();
        }),
        this.dishPageService.loadingSubject.subscribe(isLoading => {
          this.isLoading = isLoading;
        })
      )
  }

  ngAfterViewInit(): void {
    this.visualizationService.scrollY(0, false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public scrollToReviews(): void {
    const reviewsEl = this.reviewsRef.nativeElement;
    this.visualizationService.scrollY(reviewsEl.getBoundingClientRect().top - 100);
  }

  private getRatingText(): string {
    // TODO - add some dish interface to not have to add exclamation mark everywhere
    const lastDigit = this.dish.ratingsCount! % 10;
    if (lastDigit === 0 || 5 <= lastDigit && lastDigit <= 9 || lastDigit === 1 && this.dish.ratingsCount! > 10 || this.dish.ratingsCount! >= 10 && this.dish.ratingsCount! <= 21) return 'ocen';
    if (lastDigit === 1) return 'ocena';
    return 'oceny';
  }

  private getImagesAlts(): string[] {
    return new Array(this.dish.images!.length).fill('').map(_ => this.dish.name);
  }
}
