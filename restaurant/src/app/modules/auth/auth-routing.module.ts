import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthViewComponent } from "./views/auth-view/auth-view.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";

const routes: Routes = [
  {
    path: '',
    component: AuthViewComponent,
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthViewComponent,
    children: [
      {
        path: '',
        component: LoginFormComponent
      }
    ]
  },
  {
    path: 'register',
    component: AuthViewComponent,
    children: [
      {
        path: '',
        component: RegisterFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
