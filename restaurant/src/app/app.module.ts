// Built-in modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

// Our modules
import { CoreModule } from '@core/core.module';

// Components
import { AppComponent } from './app.component';

// Services
import { AuthInterceptorService } from '@auth/interceptors/auth.interceptor.service';

// Directives
import { AuthorizationDirective } from "@auth/directives/authorization.directive";


@NgModule({
  imports: [
    // Built-in modules
    BrowserModule,
    HttpClientModule,

    // Our modules
    CoreModule
  ],

  // Components
  declarations: [
    AuthorizationDirective,

    AppComponent
  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
