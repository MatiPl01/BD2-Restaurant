import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesViewComponent } from "./views/dishes-view/dishes-view.component";
import { DishViewComponent } from "./views/dish-view/dish-view.component";
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { AuthenticationGuard } from '@auth/guards/authentication.guard';
import { RoleEnum } from '@shared/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    component: DishesViewComponent,
  },
  {
    path: ':id',
    component: DishViewComponent,
    children: [
      {
        path: 'review',
        component: CreateReviewComponent,
        canActivate: [AuthenticationGuard],
        data: {
          restrictTo: [RoleEnum.USER]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishesRoutingModule {}
