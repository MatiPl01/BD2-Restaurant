import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishesListViewComponent } from './views/dishes-list-view/dishes-list-view.component';
import { DishViewComponent } from './views/dish-view/dish-view.component';


@NgModule({
  declarations: [
    DishesListViewComponent,
    DishViewComponent
  ],
  imports: [
    CommonModule,
    DishesRoutingModule
  ]
})
export class DishesModule { }
