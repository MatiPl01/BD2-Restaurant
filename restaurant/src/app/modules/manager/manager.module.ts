import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerViewComponent } from './views/manager-view/manager-view.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { AddDishFormComponent } from './components/add-dish-form/add-dish-form.component';
import { AddDishImagesComponent } from './components/add-dish-images/add-dish-images.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {FilterService} from "@dishes/services/filter.service";
import {PaginationService} from "@shared/services/pagination.service";
import {DishesModule} from "@dishes/dishes.module";


@NgModule({
  declarations: [


    ManagerViewComponent,
              AddDishComponent,
              DishListComponent,
              DishCardComponent,
              AddDishFormComponent,
              AddDishImagesComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    SharedModule,
    DishesModule
  ],
  providers: [
    FilterService,
    PaginationService
  ]
})
export class ManagerModule { }
