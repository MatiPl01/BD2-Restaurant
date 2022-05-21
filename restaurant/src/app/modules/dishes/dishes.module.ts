import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from '@shared/shared.module';

import { DishViewComponent } from './views/dish-view/dish-view.component';
import { DishesRoutingModule } from './dishes-routing.module';
import { DishesViewComponent } from './views/dishes-view/dishes-view.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
import { DishesFiltersComponent } from './components/dishes-filters/dishes-filters.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';


@NgModule({
  declarations: [
    DishesViewComponent,
    DishViewComponent,
    DishesListComponent,
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
  ]
})
export class DishesModule {}
