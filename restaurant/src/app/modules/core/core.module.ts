import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
// import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from "../../app-routing.module";
import { SharedModule } from "@shared/shared.module";

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { NotFoundComponent } from './views/not-found/not-found.component';
import { CurrencyService } from "@core/services/currency.service";
import { AuthorizationDirective } from "@shared/directives/authorization.directive";
import { ScrollTopBtnComponent } from './components/scroll-top-button/scroll-top-button.component';

// Interceptor Services
import { AuthInterceptor } from '@auth/interceptors/auth-interceptor.service';
import { HttpRequestInterceptor } from "@core/interceptors/http-request.interceptor";
import { AlertComponent } from './components/alert/alert.component';
import { GlobalErrorHandler } from './handlers/global-error.handler';
import { ConfigService } from './services/config.service';
import { AuthService } from '@auth/services/auth.service';


@NgModule({
  imports: [
    // Built-in modules
    // FormsModule,
    HttpClientModule,

    // Out modules
    AppRoutingModule,
    SharedModule
  ],

  declarations: [
    // Directives
    // AuthorizationDirective,

    // Components
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    ScrollTopBtnComponent
  ],

  providers: [
    CurrencyService,

    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { 
      provide: APP_INITIALIZER,
      deps: [ConfigService, CurrencyService, AuthService],
      useFactory: (_: any) => () => {},
      multi: true
    }
  ],

  exports: [
    // Our modules
    AppRoutingModule,
    // AuthorizationDirective,

    // Components
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    ScrollTopBtnComponent,
    AlertComponent
  ]
})
export class CoreModule {}
