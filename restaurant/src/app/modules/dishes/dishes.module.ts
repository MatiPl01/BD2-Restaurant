import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { SharedModule } from '@shared/shared.module';

import { DishViewComponent } from './views/dish-view/dish-view.component';
import { DishesRoutingModule } from './dishes-routing.module';
import { DishesViewComponent } from './views/dishes-view/dishes-view.component';
import { CardsComponent } from './components/cards/cards.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CardComponent } from './components/card/card.component';
import { DetailsComponent } from './components/details/details.component';
import { FilterService } from './services/filter.service';
import { PaginationService } from '@shared/services/pagination.service';
import { ReviewComponent } from './components/review/review.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';


@NgModule({
  declarations: [
    DishesViewComponent,
    DishViewComponent,
    CardsComponent,
    FiltersComponent,
    CardComponent,
    DetailsComponent,
    ReviewComponent,
    ReviewsComponent,
    CreateReviewComponent,
    ReviewFormComponent
  ],
  imports: [
    SharedModule,
    DishesRoutingModule,
    FormsModule,
  ],
  exports: [
    FiltersComponent
  ],
  providers: [
    FilterService,
    PaginationService
  ]
})
export class DishesModule {}
