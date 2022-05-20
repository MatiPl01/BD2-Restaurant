import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "../../app-routing.module";
import { SharedModule } from "@shared/shared.module";

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { NotFoundComponent } from './views/not-found/not-found.component';
import { CurrencyService } from "@shared/services/currency.service";
import { AuthorizationDirective } from "@auth/directives/authorization.directive";
import { ScrollTopBtnComponent } from './components/scroll-top-button/scroll-top-button.component';


@NgModule({
  imports: [
    // Built-in modules
    FormsModule,

    // Out modules
    AppRoutingModule,
    SharedModule
  ],

  declarations: [
    // Directives
    AuthorizationDirective,

    // Components
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    ScrollTopBtnComponent
  ],

  providers: [
    CurrencyService
  ],

  exports: [
    // Our modules
    AppRoutingModule,

    // Components
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    ScrollTopBtnComponent
  ]
})
export class CoreModule {}
