import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { VisualizationService } from "@core/services/visualization.service";
import { DishService } from "@dishes/services/dish.service";
import Dish from "@dishes/models/dish.model";

@Component({
  selector: 'dishes-dish-view',
  templateUrl: './dish-view.component.html'
})
export class DishViewComponent {
  @ViewChild('reviews') reviews!: ElementRef;
  public dish!: Dish;
  public ratingText: string = '';
  public imagesAlts: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private visualizationService: VisualizationService,
              private dishService: DishService) {
    const dishID = this.activatedRoute.snapshot.params['id'];

    // TODO - add current currency to the fetch params
    this.dishService.fetchDish(dishID).subscribe((dish: Dish) => {
      this.dish = dish;
      this.ratingText = this.getRatingText();
      this.imagesAlts = this.getImagesAlts();
    });
  }

  ngAfterViewInit() {
    this.visualizationService.scrollY(0, false);
  }

  public scrollToReviews(): void {
    const reviewsEl = this.reviews.nativeElement;
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
