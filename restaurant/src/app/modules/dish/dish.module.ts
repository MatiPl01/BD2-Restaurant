import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishRoutingModule } from './dish-routing.module';
import { DishViewComponent } from './views/dish-view/dish-view.component';


@NgModule({
  declarations: [
    DishViewComponent
  ],
  imports: [
    CommonModule,
    DishRoutingModule
  ]
})
export class DishModule { }
