import { Component, ElementRef } from '@angular/core';
import { DishCardsService } from '@dishes/services/dish-cards.service';
import { Subscription } from 'rxjs';
import { DishCard } from '@dishes/interfaces/dish-card.interface';
import { PaginationService } from '@shared/services/pagination.service';

@Component({
  selector: 'dishes-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent {
  public dishes: DishCard[] = [];
  public pagesCount!: number;
  public currentPage!: number;
  public isLoading = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(private dishCardService: DishCardsService,
              private paginationService: PaginationService) {
    this.subscriptions.push(
      this.dishCardService.dishesSubject.subscribe(dishes => {
        this.dishes = dishes;
      }),
      this.dishCardService.loadingSubject.subscribe(isLoading => {
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
