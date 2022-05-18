import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishViewComponent } from './views/dish-view/dish-view.component';
import {AddDishFormComponent} from "@dishes/views/add-dish-form/add-dish-form.component";
import {DishCardComponent} from "@dishes/views/dish-card/dish-card.component";
import {DishDetailsComponent} from "@dishes/views/dish-details/dish-details.component";
import {DishOrderComponent} from "@dishes/views/dish-order/dish-order.component";
import {DishQuantityComponent} from "@dishes/views/dish-quantity/dish-quantity.component";
import {DishesPaginationComponent} from "@dishes/views/dishes-pagination/dishes-pagination.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DishesComponent } from './views/dishes/dishes.component';
import { DishesListComponent } from './views/dishes-list/dishes-list.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    AddDishFormComponent,
    DishCardComponent,
    DishDetailsComponent,
    DishOrderComponent,
    DishQuantityComponent,
    DishesPaginationComponent,
    DishViewComponent,
    DishesComponent,
    DishesListComponent
  ],
  imports: [
    CommonModule,
    DishesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class DishesModule { }
