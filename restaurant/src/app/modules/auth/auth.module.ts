import { NgModule } from '@angular/core';

import { SharedModule } from "@shared/shared.module";
import { FormsModule } from "@angular/forms";

import { AuthViewComponent } from './views/auth-view/auth-view.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthHelperService } from "@auth/services/auth-helper.service";


@NgModule({
  imports: [
    SharedModule,
    FormsModule,

    AuthRoutingModule
  ],
  declarations: [
    AuthViewComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  providers: [
    AuthHelperService
  ]
})
export class AuthModule {}
