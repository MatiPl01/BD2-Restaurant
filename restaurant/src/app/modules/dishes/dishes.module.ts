import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishesListViewComponent } from './views/dishes-list-view/dishes-list-view.component';
import { DishViewComponent } from './views/dish-view/dish-view.component';
import {AddDishFormComponent} from "@dishes/views/add-dish-form/add-dish-form.component";
import {DishCardComponent} from "@dishes/views/dish-card/dish-card.component";
import {DishDetailsComponent} from "@dishes/views/dish-details/dish-details.component";
import {DishOrderComponent} from "@dishes/views/dish-order/dish-order.component";
import {DishQuantityComponent} from "@dishes/views/dish-quantity/dish-quantity.component";
import {DishesPaginationComponent} from "@dishes/views/dishes-pagination/dishes-pagination.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DishesListViewComponent,
    AddDishFormComponent,
    DishCardComponent,
    DishDetailsComponent,
    DishOrderComponent,
    DishQuantityComponent,
    DishesPaginationComponent,
    DishViewComponent
  ],
  imports: [
    CommonModule,
    DishesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DishesModule { }
