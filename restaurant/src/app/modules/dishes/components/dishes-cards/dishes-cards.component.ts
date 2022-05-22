import { Component, ElementRef } from '@angular/core';
import { DishService } from '@dishes/services/dish.service';
import { Subscription } from 'rxjs';
import { DishCard } from '@dishes/interfaces/dish-card.interface';
import { PaginationService } from '@shared/services/pagination.service';

@Component({
  selector: 'dishes-dishes-cards',
  templateUrl: './dishes-cards.component.html'
})
export class DishesCardsComponent {
  public dishes: DishCard[] = [];
  public pagesCount!: number;
  public currentPage!: number;
  public isLoading = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(private dishService: DishService,
              private paginationService: PaginationService) {
    this.subscriptions.push(
      this.dishService.dishesSubject.subscribe(dishes => {
        this.dishes = dishes;
      }),
      this.dishService.loadingSubject.subscribe(isLoading => {
        this.isLoading = isLoading;
      }),
      this.paginationService.currentPageSubject.subscribe(currentPage => {
        if (this.currentPage !== currentPage) this.currentPage = currentPage;
      }),
      this.paginationService.pagesCountSubject.subscribe(pagesCount => {
        this.pagesCount = pagesCount;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public setCurrentPage(pageNum: number): void {
    this.paginationService.setCurrentPage(pageNum);
  }
}
