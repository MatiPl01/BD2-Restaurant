import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishViewComponent } from "./views/dish-view/dish-view.component";
import {DishesComponent} from "@dishes/views/dishes/dishes.component";

const routes: Routes = [
  {
    path: '',
    component: DishesComponent,
  },
  {
    path: ':id',
    component: DishViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishesRoutingModule { }
