import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "../../app-routing.module";
import { SharedModule } from "@shared/shared.module";

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { NotFoundComponent } from './views/not-found/not-found.component';
import { CurrencyService } from "@shared/services/currency.service";
import { AuthorizationDirective } from "@auth/directives/authorization.directive";


@NgModule({
  imports: [
    // Built-in modules
    CommonModule,
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
    NotFoundComponent
  ]
})
export class CoreModule {}
