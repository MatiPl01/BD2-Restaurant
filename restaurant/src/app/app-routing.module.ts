import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from "@core/views/not-found/not-found.component";
import { AuthenticationGuard } from "@auth/guards/authentication.guard";
import { AuthorizationGuard } from "@auth/guards/authorization.guard";
import { NgModule } from '@angular/core'
import { RoleEnum } from "@shared/enums/role.enum";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dishes',
    loadChildren: () => import('./modules/dishes/dishes.module').then(m => m.DishesModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: {
      restrictTo: [RoleEnum.USER]
    }
  },
  {
    path: 'manager-panel',
    loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule),
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: {
      restrictTo: [RoleEnum.MANAGER]
    }
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: {
      restrictTo: [RoleEnum.ADMIN]
    }
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
