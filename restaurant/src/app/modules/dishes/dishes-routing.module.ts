import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesListViewComponent } from "./views/dishes-list-view/dishes-list-view.component";
import { DishViewComponent } from "./views/dish-view/dish-view.component";

const routes: Routes = [
  {
    path: '',
    component: DishesListViewComponent,
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
