import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from '@shared/shared.module';

import { DishViewComponent } from './views/dish-view/dish-view.component';
import { DishesRoutingModule } from './dishes-routing.module';
import { DishesViewComponent } from './views/dishes-view/dishes-view.component';
import { DishesCardsComponent } from './components/dishes-cards/dishes-cards.component';
import { DishesFiltersComponent } from './components/dishes-filters/dishes-filters.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishCardsService } from './services/dish-cards.service';
import { FilterService } from './services/filter.service';
import { PaginationService } from '@shared/services/pagination.service';


@NgModule({
  declarations: [
    DishesViewComponent,
    DishViewComponent,
    DishesCardsComponent,
    DishesFiltersComponent,
    DishCardComponent,
    DishDetailsComponent
  ],
  imports: [
    CommonModule,
    DishesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    FilterService,
    PaginationService
  ]
})
export class DishesModule {}
