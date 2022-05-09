import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthViewComponent } from "./views/auth-view/auth-view.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";

const routes: Routes = [
  {
    path: '',
    component: AuthViewComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'register',
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
