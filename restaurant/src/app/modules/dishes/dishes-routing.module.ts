import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesViewComponent } from "./views/dishes-view/dishes-view.component";
import { DishViewComponent } from "./views/dish-view/dish-view.component";

const routes: Routes = [
  {
    path: '',
    component: DishesViewComponent,
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
